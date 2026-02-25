<script setup>
import '../aframe/duplicate.js';

</script>

<template>
    <a-entity>
        <a-ocean color="darkblue" width="500" depth="500" density="150" speed="2"></a-ocean>
        <a-box duplicate="width: 1; depth: 1; gap: 0.05; countX: 30; countZ: 30" 
               color="darkgreen" 
               scale="1 0.1 1" 
               position="-15 0.5 -15"
               material="roughness: 0.8"
               static-body></a-box>
        <a-box id="box-right-grabbable" color="red" scale="1 1 1" position="0 1.5 -5" clickable outline-on-event
            simple-grab></a-box>
        

    </a-entity>
</template> 