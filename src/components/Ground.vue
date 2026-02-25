<script setup>
import '../aframe/duplicate.js';

</script>

<template>
    <a-entity>
        <a-plane 
           color=#582900 
           width="6" 
           height="6" 
           rotation="-90 0 0" 
           position="0 0 -1.5" 
           material="
                roughness: 2.0;
                metalness: 0.0">
        </a-plane>
        <a-plane 
            color="lightgreen" 
            width="4" 
            height="4" 
            rotation="-90 0 0" 
            position="0 0.1 -1"
            material="roughness: 0.8">
        </a-plane>
        <a-gltf-model 
            src="assets/Model/grass.glb"
            duplicate="width: 0.6; depth: -0.72; gap: 0; countX: 7; countZ: 6; randomRotationY: false"
            position="-1.7 0.11 0.3"
            scale="0.9 0.9 0.9"
            rotation="0 15 0">
        </a-gltf-model>


        <!-- Bord bas -->
        <!-- <a-gltf-model 
            src="assets/Model/wet_dirt_ground.glb"
            duplicate="width: 1.05; depth: 0; gap: 0; countX: 4; countZ: 3; randomRotationY: false"
            position="-1.5 0.1 -3.2"
            scale="1 1 1">
        </a-gltf-model> -->
        <!-- Bord haut -->
        <!-- <a-gltf-model 
            src="assets/Model/wet_dirt_ground.glb"
            duplicate="width: 1.05; depth: 0; gap: 0; countX: 4; countZ: 3; randomRotationY: false"
            position="-1.5 0.1 1.5"
            scale="1 1 1">
        </a-gltf-model> -->
        <!-- Bord gauche -->
        <!-- <a-gltf-model 
            src="assets/Model/wet_dirt_ground.glb"
            duplicate="width: 0; depth: -1.05; gap: 0; countX: 3; countZ: 4; randomRotationY: false"
            position="-2.5 0.1 0.5"
            scale="1 1 1">
        </a-gltf-model> -->
        <!-- Bord droit -->
        <!-- <a-gltf-model 
            src="assets/Model/wet_dirt_ground.glb"
            duplicate="width: 0; depth: -1.05; gap: 0; countX: 3; countZ: 4; randomRotationY: false"
            position="2.5 0.1 0.5"
            scale="1 1 1">
        </a-gltf-model> -->
    </a-entity>
</template> 