<script setup>
import '../aframe/duplicate.js';

</script>

<template>
    <a-entity>
        <a-gltf-model
            src="assets/Model/simple_grass_ground_free_low_model.glb"
            duplicate="rows: 17; cols: 10; gap: -3.5; gltf: assets/Model/simple_grass_ground_free_low_model.glb"
            position="0 0.15 -3.5"
            scale="1 1 1"
            rotation="0 0 0">
        </a-gltf-model>
        <!-- <a-plane 
            color="darkgreen"
            width="3" 
            height="3" 
            rotation="-90 0 0" 
            position="0 0.15 -1"
            material="roughness: 0.8">
        </a-plane> -->
        <a-gltf-model 
            id="grass-ground"
            src="assets/Model/grass.glb"
            duplicate="rows: 4; cols: 5; gap: -0.12; gltf: assets/Model/grass.glb; instanceRotationY: 15"
            position="0.1 0.16 -1.4"
            scale="0.9 0.9 0.9"
            rotation="0 0 0">
        </a-gltf-model>


        <!-- Barrière périmètre — ajuster gap selon la taille réelle du modèle fence -->
        <!-- Côté avant (Z proche) -->
        <a-gltf-model
            src="assets/Model/wood_fence_low_poly.glb"
            duplicate="rows: 7.9; cols: 1; gap: 1.15; gltf: assets/Model/wood_fence_low_poly.glb"
            position="0.5 0.16 2.4"
            scale="1 1 1"
            rotation="0 90 0">
        </a-gltf-model>
        <!-- Côté arrière (Z loin) -->
        <a-gltf-model
            src="assets/Model/wood_fence_low_poly.glb"
            duplicate="rows: 7.9; cols: 1; gap: 1.1; gltf: assets/Model/wood_fence_low_poly.glb"
            position="0.3 0.16 -9.5"
            scale="1 1 1"
            rotation="0 90 0">
        </a-gltf-model>
        <!-- Côté gauche (X négatif) -->
        <a-gltf-model
            src="assets/Model/wood_fence_low_poly.glb"
            duplicate="rows: 10; cols: 1; gap: 0.06; gltf: assets/Model/wood_fence_low_poly.glb"
            position="-4.2 0.16 -3.55"
            scale="1 1 1"
            rotation="0 0 0">
        </a-gltf-model>
        <!-- Côté droit (X positif) -->
        <a-gltf-model
            src="assets/Model/wood_fence_low_poly.glb"
            duplicate="rows: 11; cols: 1; gap: 0.06; gltf: assets/Model/wood_fence_low_poly.glb"
            position="4.2 0.16 -4"
            scale="1 1 1"
            rotation="0 -0 0">
        </a-gltf-model>
        
    </a-entity>
</template> 