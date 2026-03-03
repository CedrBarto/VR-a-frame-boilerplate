AFRAME.registerComponent('teleport-camera-rig', {
  multiple: true,

  schema: {
    // The camera rig must be a direct child of <a-scene>
    rig: {type: 'selector', default: '#camera-rig'},
    camera: {type: 'selector', default: '[camera]'},
    on: {type: 'string', default: 'click'},
    x: {type: 'number', default: 0},
    y: {type: 'number', default: 0},
    z: {type: 'number', default: 0},
    handleRotation: {type: 'boolean', default: true},
    rot: {type: 'number', default: 0}, // rotation in degrees
  },

  init: function () {
    this.onEvent = this.onEvent.bind(this);
    this.el.addEventListener(this.data.on, this.onEvent);
  },

  onEvent: function () {
    const self = this;
    const fadeDuration = 1200;
    const fader = document.querySelector('#vr-fader');
    if (fader) {
      // Fade to black
      fader.removeAttribute('animation');
      fader.setAttribute('animation',
        'property: material.opacity; from: 0; to: 1; dur: ' + fadeDuration + '; easing: easeInQuad;');
      setTimeout(function () {
        self._doTeleport();
        self._spawnBeerCan();
        // Fade back to clear
        fader.removeAttribute('animation');
        fader.setAttribute('animation',
          'property: material.opacity; from: 1; to: 0; dur: ' + fadeDuration + '; easing: easeOutQuad;');
      }, fadeDuration + 50);
    } else {
      this._doTeleport();
      this._spawnBeerCan();
    }
  },

  _spawnBeerCan: function () {
    // Son canette
    var beerSound = document.querySelector('#beer-sound');
    if (beerSound && beerSound.components && beerSound.components.sound) {
      beerSound.components.sound.playSound();
    }
    // Canette pré-placée dans #hand-right (position/rotation définie dans TheCameraRig.vue)
    // On la rend simplement visible — fonctionne en desktop et en VR
    var existing = document.querySelector('#hand-right [data-beer]');
    if (existing) existing.setAttribute('visible', 'true');
  },

  _doTeleport: function () {
    // Put the rig at the specified position
    this.data.rig.object3D.position.x = this.data.x;
    this.data.rig.object3D.position.y = this.data.y;
    this.data.rig.object3D.position.z = this.data.z;
    // Put the camera at the centre of the rig
    this.data.camera.object3D.position.x = 0;
    this.data.camera.object3D.position.z = 0;
    // Rotate the rig if needed
    if (this.data.handleRotation) {
      // Take the camera quaternion
      const quaternion = new THREE.Quaternion();
      quaternion.setFromEuler(new THREE.Euler(0, this.data.camera.object3D.rotation.y, 0));
      // invert it to nullify the camera rotation
      quaternion.invert();
      // convert this.data.rot to a quaternion
      const quaternionToApply = new THREE.Quaternion();
      const rot = THREE.MathUtils.degToRad(this.data.rot);
      quaternionToApply.setFromEuler(new THREE.Euler(0, rot, 0));
      // combine the two quaternions and apply to the rig
      quaternion.multiply(quaternionToApply);
      this.data.rig.object3D.setRotationFromQuaternion(quaternion);
    }
  },

  update: function (oldData) {
    if (oldData.on != this.data.on) {
      this.el.removeEventListener(oldData.on, this.onEvent);
      this.el.addEventListener(this.data.on, this.onEvent);
    }
  },

  remove: function () {
    this.el.removeEventListener(this.data.on, this.onEvent);
  },

});