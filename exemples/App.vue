<script setup lang="ts">
//import ImageInput from '../src/components/ImageInput.vue'
import {ImageInput } from '/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/vue3-image-input.es.js';
import '/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/style.css'
</script>

<template>
  <h1>Upload a beautiful picture</h1>
  <div>
 

    <ImageInput format="medium" resizable  class="your-class" />
    
    <button type="submit">Send</button>
  </div>
</template>

<style  >
/*@import url('/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/style.css');*/


.your-class {
  width: 200px;
  height: 400px;
  background-color: #ef0d50;
}
.your-class .preview {
  background-color: #e1f2f7;
  margin-top: 20px;
}

button {
  font-size: 25px;
  background-color: #70bb3f;
  color: aliceblue;
  border-style: none;
  border-radius: 5px;
  padding: 15px;
  width: 200px;
  margin-top: 100px;
}
h1 {
  color: #e1f2f7;
  margin-bottom: 50px;
}
body {
  background-color: #1f3044;
  padding-left: 200px;
}

</style>
