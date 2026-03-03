<script setup>
  import { ref, onMounted } from 'vue';

  import TheCameraRig from './TheCameraRig.vue';
  import Ground from './Ground.vue';

  import '../aframe/simple-grab.js';
  import '../aframe/outline.js';
  import '../aframe/collider-two-hands.js';
  import '../aframe/lawnmower-drive.js';
  import '../aframe/teleport-camera-rig.js';

  defineProps({
    scale: Number,
    overlaySelector: String,
  });

  const allAssetsLoaded = ref(false);

  onMounted(() => {
    // Sécurité : afficher la scène après 8s même si un asset échoue
    setTimeout(() => { allAssetsLoaded.value = true; }, 8000);
    // Ambiance : démarrer au premier geste utilisateur (politique AudioContext navigateur)
    const startAmbient = () => {
      const el = document.querySelector('#ambient-sound');
      if (el) {
        // Attendre que le composant sound soit prêt
        const tryPlay = () => {
          if (el.components && el.components.sound) {
            el.components.sound.playSound();
          } else {
            setTimeout(tryPlay, 100);
          }
        };
        tryPlay();
      }
    };
    document.addEventListener('click', startAmbient, { once: true });
    document.addEventListener('keydown', startAmbient, { once: true });
    document.addEventListener('touchstart', startAmbient, { once: true });
    // Canette + son gérés directement dans teleport-camera-rig.js (_spawnBeerCan)
  });
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

   <a-assets timeout="8000" @loaded="allAssetsLoaded = true">
      <a-asset-item id="lawnmower" :src="`assets/Model/hello_neighbor_2_alpha_2_lawnmower.glb`"></a-asset-item>
      <a-asset-item id="house" :src="`assets/Model/low_poly_house_3.glb`"></a-asset-item>
      </a-assets>


    <template v-if="allAssetsLoaded">
      <Ground />
      <a-sky src="assets/background/grasslands_sunset.jpg" position="0 10 0"></a-sky>

      <!-- Maison -->
      <a-entity
        gltf-model="#house"
        position="1.5 0.16 -6.5"
        scale="2.5 2.5 2.5"
        rotation="0 0 0">
      </a-entity>

      <a-gltf-model
        src="assets/Model/low_poly_stylized_rustic_wooden_chair_minimal.glb"
        position="2 0.65 -3.5"
        scale=" 0.03 0.03 0.03"
        rotation="0 -115 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/low_poly_round_wooden_table.glb"
        position="1.2 0.40 -2"
        scale=" 0.15 0.15 0.15"
        rotation="0 -115 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/low_poly_big_forest_tree.glb"
        position="6 0.20 -3"
        scale=" 0.6 0.6 0.6"
        rotation="0 -115 0">
      </a-gltf-model>
      <a-gltf-model
        src="assets/Model/low_poly_big_forest_tree.glb"
        position="-6 0.20 -6"
        scale=" 0.6 0.6 0.6"
        rotation="0 0 0">
      </a-gltf-model>
      <a-gltf-model
        src="assets/Model/low_poly_big_forest_tree.glb"
        position="-1 0.20 3.5"
        scale=" 0.6 0.6 0.6"
        rotation="0 90 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/low_poly_flowers.glb"
        duplicate="rows: 2; cols: 1; gap: 50; gltf: assets/Model/low_poly_flowers.glb; instanceRotationY: 15"
        position="2 0.20 0.2"
        scale=" 0.006 0.006 0.006"
        rotation="0 90 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/low_poly_nature_pack.glb"
        duplicate="rows: 3; cols: 3; gap: 13; gltf: assets/Model/low_poly_nature_pack.glb; instanceRotationY: 15"
        position="0.6 0.20 -1.3"
        scale=" 0.2 0.2 0.2"
        rotation="0 90 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/stylized_bush_low_poly.glb"
        duplicate="rows: 1; cols: 3; gap: 9; gltf: assets/Model/stylized_bush_low_poly.glb; instanceRotationY: 15"
        position="-3 0.20 -3"
        scale=" 0.3 0.3 0.3"
        rotation="0 90 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/great_tit_bird_low_poly.glb"
        position="-2.48 2.12 -3.68"
        scale=" 1 1 1"
        rotation="0 70 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/great_tit_bird_low_poly.glb"
        position="0.5 2.09 3.45"
        scale=" 1 1 1"
        rotation="0 -100 0">
      </a-gltf-model>

      <a-gltf-model
        src="assets/Model/wooden_sign_-_baked_low_poly.glb"
        position="0 0.20 3.5"
        scale=" 0.6 0.7 0.6"
        rotation="0 180 0">
      </a-gltf-model>
      <!-- Texte du chrono affiché sur le panneau à la fin de la tonte -->
      <a-text
        id="timer-sign"
        value=""
        transparency="0.8"
        align="center"
        color=#d8cbc6
        width="0.9"
        wrap-count="12"
        position="0 1.68 3.335"
        rotation="0 180 0">
      </a-text>



      <!-- Lawnmower avec hitbox --> <!-- position="-1.28 0.1 -2.8" -->
      <a-entity 
        gltf-model="#lawnmower"
        position="-1.28 0.1 -2.8"    
        scale="0.8 0.8 0.8"
        rotation="0 0 0"
        lawnmower-drive="speed: 1; mowRadius: 0.45; mowedScale: 0.2"
        teleport-camera-rig="on: game-end; x: 1.5; y: 0; z: -2; rot: 150"
        sound="src: url(assets/lawn-mower-02.mp3); loop: true; autoplay: false; volume: 1"
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

      <!-- Barrières -->
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
        duplicate="rows: 10; cols: 1; gap: 0.06; gltf: assets/Model/wood_fence_low_poly.glb"
        position="4.2 0.16 -3.50"
        scale="1 1 1"
        rotation="0 0 0">
      </a-gltf-model>

      <a-entity light="type: ambient; color: #fff; intensity: 1"></a-entity>
      <a-entity light="type: directional; intensity: 1" position="0 5 0"></a-entity>
    </template>

    <!-- Ambiance oiseaux : démarre après le premier geste (politique navigateur) -->
    <a-entity id="ambient-sound" sound="src: url(assets/mixkit-morning-birds-2472.mp3); loop: true; autoplay: false; positional: false; volume: 0.5"></a-entity>
    <!-- Son canette de bière : joué une fois à la téléportation -->
    <a-entity id="beer-sound" sound="src: url(assets/freesound_community-beer-can-open-and-drink-46695.mp3); loop: false; autoplay: false; positional: false; volume: 3"></a-entity>

    <TheCameraRig />

  </a-scene>
</template>