import { getRandomFloat } from '../utils/math.js';

AFRAME.registerComponent('duplicate', {
  schema: {
    rows: {type: 'number', default: 2},
    cols: {type: 'number', default: 2},
    gap: {type: 'number', default: 0.1},
    gltf: {type: 'string', default: ''},
    entropy: {type: 'number', default: 0},
    entropyHeight: {type: 'number', default: 0},
    instanceRotationY: {type: 'number', default: 0}, // rotation Y en degrés appliquée sur chaque instance
  },

  init: function () {
    this.target = this.el;
    this.parent = document.createElement('a-entity');
    this.clone0 = this.target.cloneNode(true);
    this.clone0.removeAttribute('duplicate');
    this.clone0.removeAttribute('position');

    if (!this.data.gltf) {
      this.calculateBoundingBox();
      this.createDuplicates();
      this.target.setAttribute('material', 'opacity', 0);
    } else {
      this.target.addEventListener('model-loaded', () => {
        this.calculateBoundingBox();
        this.createInstancedDuplicates();
      }, {once: true});
    }
  },

  calculateBoundingBox: function () {
    const box = new THREE.Box3().setFromObject(this.target.object3D);
    const size = new THREE.Vector3();
    box.getSize(size);
    this.width = size.x;
    this.depth = size.z;
  },

  createDuplicates: function () {
    const {rows, cols, gap} = this.data;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const clone = this.clone0.cloneNode(true);
        const x = col * (gap + this.width) + getRandomFloat(-this.data.entropy, this.data.entropy);
        const z = row * (gap + this.depth) + getRandomFloat(-this.data.entropy, this.data.entropy);
        const y = getRandomFloat(-this.data.entropyHeight, this.data.entropyHeight);
        clone.object3D.position.set(x, y, z);
        if (this.data.gltf) clone.setAttribute('gltf-model', this.data.gltf);
        this.parent.appendChild(clone);
      }
    }

    const centerX = (cols - 1) * (gap + this.width) / 2;
    const centerZ = (rows - 1) * (gap + this.depth) / 2;
    this.parent.object3D.position.set(-centerX, 0, -centerZ);

    this.el.appendChild(this.parent);
  },

  createInstancedDuplicates: function () {
    const { rows, cols, gap } = this.data;
    const count = rows * cols;

    const meshes = [];
    this.target.object3D.updateWorldMatrix(true, true);
    const invModelWorld = new THREE.Matrix4().copy(this.target.object3D.matrixWorld).invert();

    this.target.object3D.traverse(node => {
      if (!node.isMesh) return;
      node.updateWorldMatrix(true, false);
      const relMatrix = new THREE.Matrix4().multiplyMatrices(invModelWorld, node.matrixWorld);
      meshes.push({ geometry: node.geometry, material: node.material, relMatrix });
    });

    const positions = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        positions.push({
          x: col * (gap + this.width) + getRandomFloat(-this.data.entropy, this.data.entropy),
          z: row * (gap + this.depth) + getRandomFloat(-this.data.entropy, this.data.entropy),
          y: getRandomFloat(-this.data.entropyHeight, this.data.entropyHeight),
        });
      }
    }

    const dummy = new THREE.Object3D();
    const relPos = new THREE.Vector3();
    const relQuat = new THREE.Quaternion();
    const relScale = new THREE.Vector3();
    const group = new THREE.Group();

    // Quaternion de correction de rotation Y appliqué sur chaque instance
    const correctionQuat = new THREE.Quaternion();
    correctionQuat.setFromEuler(new THREE.Euler(0, THREE.MathUtils.degToRad(this.data.instanceRotationY), 0));
    this._instancePositions = positions;
    this._instanceMeshMeta  = [];

    meshes.forEach(({ geometry, material, relMatrix }) => {
      relMatrix.decompose(relPos, relQuat, relScale);
      const meta = {
        pos:   relPos.clone(),
        quat:  relQuat.clone().premultiply(correctionQuat),
        scale: relScale.clone(),
      };
      const instancedMesh = new THREE.InstancedMesh(geometry, material, count);
      positions.forEach(({ x, y, z }, i) => {
        dummy.position.set(x + meta.pos.x, y + meta.pos.y, z + meta.pos.z);
        dummy.quaternion.copy(meta.quat);
        dummy.scale.copy(meta.scale);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });
      instancedMesh.instanceMatrix.needsUpdate = true;
      meta.instancedMesh = instancedMesh;
      this._instanceMeshMeta.push(meta);
      group.add(instancedMesh);
    });

    const centerX = (cols - 1) * (gap + this.width) / 2;
    const centerZ = (rows - 1) * (gap + this.depth) / 2;
    group.position.set(-centerX, 0, -centerZ);

    const modelObj = this.el.getObject3D('mesh');
    if (modelObj) modelObj.visible = false;
    this.instancedGroup = group;
    this.el.object3D.add(group);
  },

  // scaleX, scaleY, scaleZ : multiplicateurs indépendants (défaut = scaleX si omis)
  setInstanceScale: function (index, scaleX, scaleY, scaleZ) {
    if (!this._instanceMeshMeta || !this._instancePositions) return;
    const sy = (scaleY !== undefined) ? scaleY : scaleX;
    const sz = (scaleZ !== undefined) ? scaleZ : scaleX;
    const { x, y, z } = this._instancePositions[index];
    const dummy = new THREE.Object3D();

    this._instanceMeshMeta.forEach((meta) => {
      dummy.position.set(x + meta.pos.x, y + meta.pos.y, z + meta.pos.z);
      dummy.quaternion.copy(meta.quat);
      dummy.scale.set(
        meta.scale.x * scaleX,
        meta.scale.y * sy,
        meta.scale.z * sz,
      );
      dummy.updateMatrix();
      meta.instancedMesh.setMatrixAt(index, dummy.matrix);
      meta.instancedMesh.instanceMatrix.needsUpdate = true;
    });
  },

  remove: function () {
    if (!this.data.gltf) {
      this.parent.replaceChildren();
      this.el.removeChild(this.parent);
    } else {
      this.el.object3D.remove(this.instancedGroup);
      this.instancedGroup.traverse(obj => {
        if (obj.isInstancedMesh) obj.dispose();
      });
      const modelObj = this.el.getObject3D('mesh');
      if (modelObj) modelObj.visible = true;
    }
  },

});
