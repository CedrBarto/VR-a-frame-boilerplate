<script setup>
  import '../aframe/disable-in-vr.js';
  import '../aframe/hide-in-vr.js';
  import '../aframe/simple-navmesh-constraint.js';
  import '../aframe/blink-controls.js';
  import '../aframe/physx-grab.js';
</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >

      <a-entity
        id="head"
        look-controls="pointerLockEnabled: true"
        simple-navmesh-constraint="navmesh: [data-role='nav-mesh']; height: 1.65;"
        disable-in-vr="component: simple-navmesh-constraint;"
        camera
        position="0 1.65 0"
      >
        <a-entity
          geometry="primitive: circle; radius: 0.0003;"
          material="shader: flat; color: white;"
          cursor
          raycaster="far: 4; objects: [clickable]; showLine: false;"
          position="0 0 -0.1"
          disable-in-vr="component: raycaster; disableInAR: false;"
          hide-in-vr="hideInAR: false"
        ></a-entity>
        <!-- Fader plane for teleport fade effect -->
        <a-plane
          id="vr-fader"
          position="0 0 -0.15"
          width="0.7"
          height="0.7"
          color="#000000"
          material="shader: flat; transparent: true; opacity: 0; depthTest: false;"
        ></a-plane>
      </a-entity>

      <a-entity id="dummy-hand-right" position="0.3 1.25 -0.5"></a-entity>
      <a-entity id="dummy-hand-left"  position="-0.3 1.25 -0.5"></a-entity>

      <a-entity
        id="hand-left"
        hand-controls="hand: left"
        position="0 1.5 0"
        obb-collider>
      </a-entity>

      <a-entity
        id="hand-right"
        hand-controls="hand: right"
        position="0 1.5 0"
        obb-collider>
        <!-- Canette de bière : invisible au départ, révélée après téléportation -->
        <a-gltf-model
          data-beer="true"
          src="assets/Model/beer_can.glb"
          scale="0.06 0.06 0.06"
          position="-0.01 0.001 -0.03"
          rotation="-100 0 0"
          visible="false">
        </a-gltf-model>
      </a-entity>

  </a-entity>
</template>