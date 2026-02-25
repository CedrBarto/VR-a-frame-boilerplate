/**
 * lawnmower-mover
 * Composant à placer sur l'entité racine de la tondeuse.
 * - Écoute les collisions OBB sur la hitbox de la poignée (handleSelector)
 * - Compte les mains en contact
 * - Avance la tondeuse sur l'axe Z à chaque tick si 2 mains sont détectées
 *
 * Paramètres :
 *   speed          - vitesse en m/s (défaut 0.5)
 *   handleSelector - sélecteur CSS de la hitbox de la poignée (défaut '.hitbox-top')
 */
/* AFRAME.registerComponent('lawnmower-mover', {

    schema: {
        speed: { type: 'number', default: 0.5 },
        handleSelector: { type: 'string', default: '.hitbox-top' },
    },

    init: function () {
        this.counterHands = 0;
        this.active = false;

        this.onHit   = this.onHit.bind(this);
        this.onLeave = this.onLeave.bind(this);

        // Les enfants sont disponibles après 'loaded'
        this.el.addEventListener('loaded', () => {
            const handle = this.el.querySelector(this.data.handleSelector);
            if (!handle) {
                console.warn('[lawnmower-mover] hitbox introuvable :', this.data.handleSelector);
                return;
            }
            this._handle = handle;
            handle.addEventListener('obbcollisionstarted', this.onHit);
            handle.addEventListener('obbcollisionended',   this.onLeave);
        });
    },

    onHit: function (e) {
        const withEl = e.detail.withEl;
        if (!withEl) return;

        const isHand = withEl.hasAttribute('hand-controls') ||
                       withEl.hasAttribute('hand-tracking-controls') ||
                       withEl.id === 'hand-left' ||
                       withEl.id === 'hand-right';
        if (!isHand) return;

        this.counterHands++;
        this.active = this.counterHands >= 2;
        console.log('[lawnmower-mover] mains en contact :', this.counterHands, '| active :', this.active);
    },

    onLeave: function (e) {
        const withEl = e.detail.withEl;
        if (!withEl) return;

        const isHand = withEl.hasAttribute('hand-controls') ||
                       withEl.hasAttribute('hand-tracking-controls') ||
                       withEl.id === 'hand-left' ||
                       withEl.id === 'hand-right';
        if (!isHand) return;

        this.counterHands = Math.max(0, this.counterHands - 1);
        this.active = false;
        console.log('[lawnmower-mover] main partie, mains restantes :', this.counterHands);
    },

    tick: function (time, delta) {
        if (!this.active) return;

        // Avance dans la direction locale -Z de la tondeuse
        const dt      = delta / 1000; // ms → secondes
        const forward = new THREE.Vector3();
        this.el.object3D.getWorldDirection(forward);
        this.el.object3D.position.addScaledVector(forward, this.data.speed * dt);
    },

    remove: function () {
        this.counterHands = 0;
        this.active = false;
        if (this._handle) {
            this._handle.removeEventListener('obbcollisionstarted', this.onHit);
            this._handle.removeEventListener('obbcollisionended',   this.onLeave);
        }
    },

}); */
