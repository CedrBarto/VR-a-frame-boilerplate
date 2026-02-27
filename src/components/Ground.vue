<script setup>
import '../aframe/duplicate.js';
</script>

<template>
    <a-entity>
        <a-plane 
            color=#075004
            width="13" 
            height="16" 
            rotation="-90 0 0" 
            position="0 0.15 -3.5"
            material="roughness: 0.8">
        </a-plane>
        <a-gltf-model 
            id="grass-ground"
            src="assets/Model/grass1.glb"
            duplicate="rows: 3; cols: 3; gap: -0.12; gltf: assets/Model/grass1.glb; instanceRotationY: 15"
            position="-0.6 0.16 -1.5"
            scale="0.9 0.9 0.9"
            rotation="0 0 0">
        </a-gltf-model>

        
    </a-entity>
</template> 