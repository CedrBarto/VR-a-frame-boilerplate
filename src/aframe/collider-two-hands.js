import { lawnmowerActivated } from '../store/state.js';

AFRAME.registerComponent('collider-two-hands', {

    schema: {
        color: { type: 'color', default: 'black' }
    },

    init: function () {
        this.counterHands = 0;

        this.el.addEventListener('obbcollisionstarted', (e) => this.onHit(e));
        this.el.addEventListener('obbcollisionended',   (e) => this.onLeave(e));
    },

    onHit: function (e) {
        const withEl = e.detail.withEl;
        // Ne compter que les mains (hand-controls ou hand-tracking-controls)
        if (!withEl) return;
        const isHand = withEl.hasAttribute('hand-controls') ||
                       withEl.hasAttribute('hand-tracking-controls') ||
                       withEl.id === 'hand-left' ||
                       withEl.id === 'hand-right';
        if (!isHand) return;

        this.counterHands++;

        if (this.counterHands >= 2) {
            lawnmowerActivated.value = true;
        } else {
            lawnmowerActivated.value = false;
        }
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
        lawnmowerActivated.value = false;
    },

    remove: function () {
        this.counterHands = 0;
        lawnmowerActivated.value = false;
    },

});
