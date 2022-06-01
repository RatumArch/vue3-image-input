<script setup lang="ts">
import { computed, ref, watch } from 'vue';
//import ImageInput from '../src/components/ImageInput.vue'
import {ImageInput } from '/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/vue3-image-input.es.js';
//import '/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/style.css'

const onSubm = (e) => console.log(e)
const theFilename = ref("jj")


</script>

<template>
  <h1>Upload a beautiful picture</h1>
  <div>
 
<form action="/" method="GET"  >
  <input type="text" name="rr"/>
    <ImageInput v-model="theFilename" resizable class="your-class" name="uploader" accept="image/*" @onWithdraw="onSubm" />
    
    <button type="submit">Send</button>
    
    <h1>Your file : {{theFilename}} </h1>
    </form>
  </div>
</template>

<style  >
@import url('/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/style.css');


.your-class {
  width: 200px;
  height: 400px;
  background-color: #ef0d50;
}
.your-class .preview {
  background-color: #e1f2f7;
  margin-top: 20px;
  border-radius: 50px;
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
</style>
