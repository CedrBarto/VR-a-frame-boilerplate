<script setup>
  import { ref } from 'vue';

  defineProps({
    loaded: Boolean,
  });

  const showOnboarding = ref(true);

  function enterScene() {
    showOnboarding.value = false;
    if (AFRAME.utils.device.checkHeadsetConnected() && !AFRAME.utils.device.isMobile()) {
      document.querySelector('a-scene').enterVR();
    }
    document.querySelector('a-scene').emit('enter-scene');
  }
</script>

<template>
  <div id="onboarding" v-if="showOnboarding">
    <div>
      <h1>A-Frame + Vite + Vue Boilerplate</h1>
      <h2>Le printemps est arrivé ! L'herbe du jardin a bien poussé, il est désormais temps de la tondre.</h2>
      <p v-if="!loaded">loading...</p>
      <button v-if="loaded" @click="enterScene()">Enter scene</button>
      <div class="licences">
        <section>
          <h4>Movement modes support</h4>
          <ul>
            <li>
              Desktop – Keyboard for move (WASD or Arrows keys) + Mouse for look
              control (Drag and drop)
            </li>
            <li>
              Mobile – 1x Finger touch to go forward + 2x Fingers touch to go
              backward + Gaze cursor for click
            </li>
            <li>
              VR/AR – walk + Teleport (Grip for grab and laser for
              click) + Gaze cursor for click
            </li>
          </ul>
        </section>
        <section>
          <h4>Source code</h4>
          <blockquote><a href="https://github.com/CedrBarto/VR-a-frame-boilerplate">Github repo</a></blockquote>
        </section>
        <dl>
          <dt>
            <i>Assets used</i>
          </dt>
          <dt>
            <a href="https://polyhaven.com/a/grasslands_sunset" target="_blank">Background image</a>
          </dt>
          <dd>
            by <a target="_blank">Dimitrios Savva and Jarod Guest</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/grass-4b800e07ea3543e3870ad5e53b39d825" target="_blank">Grass model</a>
          </dt>
          <dd>
            by <a target="_blank">MauroGonzalezA</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/hello-neighbor-2-alpha-2-lawnmower-d62e8dd938e54e448e7e0a66a1be9fea" target="_blank">Lawnmower model</a>
          </dt>
          <dd>
            by <a target="_blank">mathewgod60</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/low-poly-house-3-d2722c2e056a48ca8c922298b7a9e88b" target="_blank">House model</a>
          </dt>
          <dd>
            by <a target="_blank">POLYSCAN</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/wood-fence-low-poly-8adfbcb77b734574ba99fde5bd0df4b9" target="_blank">Wooden Fence model</a>
          </dt>
          <dd>
            by <a target="_blank">VX-Designs</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/low-poly-stylized-rustic-wooden-chair-minimal-a73ef3cf293d44178ba22b12392b88a3" target="_blank">Garden chair model</a>
          </dt>
          <dd>
            by <a target="_blank">Quickartflicks</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/low-poly-big-forest-tree-52e14dfea3234fbdabe8023166ae99ec" target="_blank">Trees model</a>
          </dt>
          <dd>
            by <a target="_blank">Vacation</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/great-tit-bird-low-poly-be290af723714f119afccc405df27dfe" target="_blank">Bird model</a>
          </dt>
          <dt>
            <a href="https://sketchfab.com/3d-models/stylized-bush-low-poly-29b0e816028b47c081c786819fbb91a0" target="_blank">Bush model</a>
          </dt>
          <dd>
            by <a target="_blank">Gatyh Interactive</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/low-poly-nature-pack-3b0b5f3599f149288281d39c358e96d7" target="_blank">Nature Pack model</a>
          </dt>
          <dd>
            by <a target="_blank">sjolle</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/low-poly-flowers-857802babfd542e094e8ef2c396be360" target="_blank">Flowers model</a>
          </dt>
          <dd>
            by <a target="_blank">Anskar</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/wooden-sign-baked-low-poly-0d2fbde1a0a446a1b3bb808664a7e08a" target="_blank">Wooden Sign model</a>
          </dt>
           <dd>
            by <a target="_blank">JeffK</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/low-poly-round-wooden-table-c8a1fbf47b8c4a4baf78362d69ff091f" target="_blank">Wooden Table model</a>
          </dt>
          <dd>
            by <a target="_blank">dannyszeto</a>
          </dd> 
          <dt>
            <a href="https://sketchfab.com/3d-models/beer-can-b3257907af8248ab99cd27ff8c6a86d1" target="_blank">Beer can model</a>
          </dt>
          <dd>
            by <a target="_blank">Arte Hexe</a>
          </dd> 
          <dt>
            <a href="https://www.soundjay.com/lawn-mower-sound-effect.html" target="_blank">Lawnmower sound effect</a>
          </dt>
          <dt>
            <a href="https://mixkit.co/free-sound-effects/bird/" target="_blank">Birds sound effect</a>
          </dt>
          <dt>
            <a href="https://pixabay.com/sound-effects/search/can%20beer%20opening/" target="_blank">Beer opening sound effect</a>
          </dt>

          <br>
          <br>

          <dt>
            <i>Included</i>
          </dt>
          <dt>
            <a href="https://github.com/c-frame/aframe-extras" target="_blank">aframe-extras</a>
          </dt><dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/c-frame/physx" target="_blank">aframe physx</a>
          </dt><dd>
            <a href="https://github.com/c-frame/aframe-extras/blob/master/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/jure/aframe-blink-controls/" target="_blank">aframe-blink-controls</a>
          </dt><dd>
            <a href="https://github.com/jure/aframe-blink-controls/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/" target="_blank">aframe-multi-camera</a>
          </dt><dd>
            <a href="https://github.com/diarmidmackenzie/aframe-multi-camera/blob/main/LICENSE" target="_blank">MIT License</a>
          </dd>

          <dt>
            <a href=" https://github.com/AdaRoseCannon/aframe-xr-boilerplate" target="_blank">simple-navmesh-constraint</a>
          </dt><dd>
            By Ada Rose Cannon under MIT License
          </dd>

          <dt>
            <a href="https://sketchfab.com/3d-models/vr-gallery-1ac32ed62fdf424498acc146fad31f7e" target="_blank">VR Gallery</a>
          </dt><dd>
            by <a href="https://sketchfab.com/mvrc.art" target="_blank">Maxim Mavrichev</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>

          <dt>
            <a href="https://sketchfab.com/3d-models/3d-gallery-for-vr-projects-68f77ed8558c4bd59e0a13e2cc9d1fd1" target="_blank">Physic room model</a>
          </dt><dd>
            by <a href="https://sketchfab.com/tekuto1s" target="_blank">tekuto1s</a>
            under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0</a>
          </dd>

        </dl>
      </div>
    </div>
  </div>
</template>

<style scoped>
  h1 { font-size: 1.5rem }
  a {
    color: #eee;
    text-decoration: none;
  }
  .licences {
    margin: 2rem 0;
    padding-bottom: 1rem;
    font-size: 1rem;
    text-align: left;
  }
  .licences dt {
    padding-top: 0.75rem;
    font-size: 0.9rem;
    font-weight: bold;
  }
  .licences dd {
    margin-left: 0;
    font-size: 0.8rem;
  }

  #onboarding {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #333;
    color: #ccc;
    width: 100vw;
    height: 100vh;
    padding: 1rem;
    font-family: monospace;
    z-index: 10000;
    overflow: auto;
  }
  #onboarding > * {
    margin: 0 auto;
    max-width: 50rem;
    width: calc(100vw - 10rem);
    text-align: center;
    border-radius: 0.3rem;
    padding: 1rem;
    font-size: 1.3rem;
  }
  #onboarding button {
    font-size: 1.3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    background-color: white;
    color: black;
    border: none;
    cursor: pointer;
  }
</style>#onboarding li {
#onboarding li {
  font-size: 1rem;
  text-align: left;
}
