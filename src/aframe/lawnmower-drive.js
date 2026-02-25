import { lawnmowerActivated } from '../store/state.js';

/**
 * lawnmower-drive
 * À placer sur l'entité racine de la tondeuse.
 * - Avance la tondeuse en suivant un trajet serpentin (5 passages) sur la zone d'herbe.
 * - Réduit la hauteur des brins d'herbe sous la tondeuse (setInstanceScale).
 * - À la fin de chaque passage, téléporte la tondeuse au début du suivant.
 * - L'utilisateur doit se déplacer pour reprendre la poignée.
 *
 * Paramètres :
 *   speed      - vitesse en m/s (défaut 0.5)
 *   mowRadius  - rayon de détection pour tondre l'herbe (défaut 0.45)
 *   mowedScale - scale Y final de l'herbe tondue (défaut 0.05)
 */
AFRAME.registerComponent('lawnmower-drive', {

    schema: {
        speed:      { type: 'number', default: 0.5 },
        mowRadius:  { type: 'number', default: 0.45 },
        mowedScale: { type: 'number', default: 0.05 },
    },

    init: function () {
        this._forward       = new THREE.Vector3();
        this._worldGrassPos = new THREE.Vector3();
        this._grassEl       = null;
        this._passIndex     = 0;
        this._done          = false;

        // 5 passages couvrant la zone 3x3 (X ∈ [-1.5, 1.5], Z ∈ [-2.5, 0.5])
        // rotY=0   → avance en +Z  (rotation actuelle du modèle)
        // rotY=180 → avance en -Z
        this._passes = [
            { x: -1.1, zStart: -2.5, zEnd:  0.5, rotY:   0 },
            { x: -0.5, zStart:  0.5, zEnd: -2.5, rotY: 180 },
            { x:  0.1, zStart: -2.5, zEnd:  0.5, rotY:   0 },
            { x:  0.7, zStart:  0.5, zEnd: -2.5, rotY: 180 },
            { x:  1.3, zStart: -2.5, zEnd:  0.5, rotY:   0 },
        ];
    },

    tick: function (time, delta) {
        if (!lawnmowerActivated.value) return;
        if (this._done) return;

        const dt = delta / 1000;
        this.el.object3D.getWorldDirection(this._forward);
        this.el.object3D.position.addScaledVector(this._forward, this.data.speed * dt);

        const pos  = this.el.object3D.position;
        const pass = this._passes[this._passIndex];

        // Détecter la fin du passage selon la direction
        const reachedEnd = (pass.rotY === 0)
            ? pos.z >= pass.zEnd   // avance vers +Z
            : pos.z <= pass.zEnd;  // avance vers -Z

        if (reachedEnd) {
            this._passIndex++;

            if (this._passIndex >= this._passes.length) {
                // Tous les passages terminés
                this._done = true;
                lawnmowerActivated.value = false;
                return;
            }

            const next = this._passes[this._passIndex];

            // Téléporter au début du prochain passage
            pos.x = next.x;
            pos.z = next.zStart;

            // Orienter la tondeuse pour le nouveau sens
            this.el.object3D.rotation.y = THREE.MathUtils.degToRad(next.rotY);

            // Désactiver pour que l'utilisateur reprenne la tondeuse
            lawnmowerActivated.value = false;
            return;
        }

        this._mowGrass();
    },

    _mowGrass: function () {
        if (!this._grassEl) {
            this._grassEl = document.querySelector('#grass-ground');
        }
        if (!this._grassEl) return;

        const dupComp = this._grassEl.components['duplicate'];
        if (!dupComp || !dupComp._instancePositions || !dupComp.instancedGroup) return;

        const lawnPos = this.el.object3D.position;
        const r2 = this.data.mowRadius * this.data.mowRadius;

        dupComp._instancePositions.forEach(({ x, y, z }, i) => {
            this._worldGrassPos.set(
                x + dupComp.instancedGroup.position.x,
                y + dupComp.instancedGroup.position.y,
                z + dupComp.instancedGroup.position.z,
            );
            this._grassEl.object3D.localToWorld(this._worldGrassPos);

            const dx = lawnPos.x - this._worldGrassPos.x;
            const dz = lawnPos.z - this._worldGrassPos.z;

            if ((dx * dx + dz * dz) < r2) {
                // X et Z inchangés, seul Y est réduit → impression d'herbe coupée
                dupComp.setInstanceScale(i, 1, this.data.mowedScale, 1);
            }
        });
    },

});


