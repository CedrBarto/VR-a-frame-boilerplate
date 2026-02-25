AFRAME.registerComponent('duplicate', {
schema: {
    width:{type: 'number', default: 10},
    depth:{type: 'number', default: 10},
    gap:{type: 'number', default: 0.1},
    countX:{type: 'number', default: 5},
    countZ:{type: 'number', default: 5},
    randomRotationY:{type: 'boolean', default: false},
},

init: function () {
    const target = this.el;
    const basePosition = target.getAttribute('position');
    
    // Supprimer l'attribut duplicate de l'élément original
    target.removeAttribute('duplicate');
    
    // Créer une grille de tuiles
    for (let x = 0; x < this.data.countX; x++) {
        for (let z = 0; z < this.data.countZ; z++) {
            // Sauter la position de l'élément original (0,0)
            if (x === 0 && z === 0) continue;
            
            const clone = target.cloneNode(true);
            const currentRot = target.getAttribute('rotation') || {x: 0, y: 0, z: 0};
            const currentScale = target.getAttribute('scale') || {x: 1, y: 1, z: 1};
            clone.setAttribute('position', {
                x: basePosition.x + x * (this.data.width + this.data.gap),
                y: basePosition.y,
                z: basePosition.z + z * (this.data.depth + this.data.gap),
            });
            clone.setAttribute('scale', {
                x: currentScale.x,
                y: currentScale.y,
                z: currentScale.z,
            });
            if (this.data.randomRotationY) {
                clone.setAttribute('rotation', {
                    x: currentRot.x,
                    y: Math.random() * 360,
                    z: currentRot.z,
                });
            } else {
                clone.setAttribute('rotation', {
                    x: currentRot.x,
                    y: currentRot.y,
                    z: currentRot.z,
                });
            }
            target.parentNode.appendChild(clone);
        }
    }
    
    console.log(`Créé ${this.data.countX * this.data.countZ} tuiles pour le sol pavé`);
},

});