<script setup>
  import { ref } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  //import TheMainRoom from './TheMainRoom.vue';
  import Ground from './Ground.vue';

  import '../aframe/simple-grab.js';
  import '../aframe/outline.js';
  import '../aframe/collider-two-hands.js';
  import '../aframe/lawnmower-drive.js';


  defineProps({
    scale: Number,
    overlaySelector: String,
  });

  const allAssetsLoaded = ref(false);
</script>

<template>
  <a-scene
    background="color: #191970;"
    _fog="type: linear; color: #191970; near: 5; far: 50"
    outline
    simple-grab
    stats
    obb-collider="showColliders:false"
  >

   <a-assets @loaded="allAssetsLoaded = true"> 
        <img id="sky-texture" :src="`assets/background/grasslands_sunset.jpg`"/>
      <a-asset-item id="lawnmower" :src="`assets/Model/hello_neighbor_2_alpha_2_lawnmower.glb`"></a-asset-item>
      <a-asset-item id="house" :src="`assets/Model/low_poly_house_3.glb`"></a-asset-item>

      </a-assets> 

    <!-- Sol simple de référence -->
    <!-- <a-plane
      data-role="nav-mesh"
      color="darkgreen"
      width="4"
      height="4"
      rotation="-90 0 0"
      position="0 0.1 -1">
    </a-plane> -->

    <template v-if="allAssetsLoaded">
      <TheMainRoom :scale="scale" />
      <Ground />
      <a-sky :src="`#sky-texture`"></a-sky>

      <!-- Maison -->
      <a-entity
        gltf-model="#house"
        position="1.5 0.16 -6.5"
        scale="2.5 2.5 2.5"
        rotation="0 0 0">
      </a-entity>

      <!-- Lawnmower avec hitbox --> <!-- position="0 0.1 0.2" -->
      <a-entity 
        gltf-model="#lawnmower"
        position="-1.1 0.1 -2.6"    
        scale="0.8 0.8 0.8"
        rotation="0 0 0"
        lawnmower-drive="speed: 1; mowRadius: 0.45; mowedScale: 0.2"
        visible="true">
        <!-- Hitbox visible en wireframe (ajuster width/height/depth selon le modèle) -->
        <a-box
          class="hitbox"
          width="0.8"
          height="0.7"
          depth="1.3"
          position="-0.05 0.3 0.5"
          material="wireframe: true; color: red"
          visible="false"
          obb-collider>
        </a-box>
        <!-- Hitbox haut de la tondeuse (poignée/guidon) -->
        <a-box
          class="hitbox-top"
          width="0.8"
          height="0.5"
          depth="0.2"
          position="-0.046 0.98 -0.1"
          material="wireframe: true; color: orange"
          visible="false"
          obb-collider
          collider-two-hands>
        </a-box>
      </a-entity>

      <a-entity light="type: ambient; color: #fff; intensity: 1"></a-entity>
      <a-entity light="type: directional; intensity: 1" position="0 5 0"></a-entity>
    </template>

    <TheCameraRig />

  </a-scene>
</template>