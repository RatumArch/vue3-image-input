<script setup lang="ts">
import { ref } from 'vue';
import {ImageInput } from '/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/vue3-image-input.es.js';

const onSubm = (e) => console.log(e)
const theFilename = ref("jj")


</script>

<template>
  <h1>Vue3 Image Input</h1>
  <div>
 <fieldset>
<form action="/" method="GET"  >
  <input type="text" name="rr" placeholder="your name"/>
    <ImageInput v-model="theFilename" class="your-class" name="image-input" accept="video/*" @onWithdraw="onSubm" />

    <button type="submit">Send</button>
    
    </form>
    <legend><h2> Upload your work</h2></legend>
    </fieldset>
  </div>
</template>

<style  >
@import url('/home/mdo/Documents/projp/vue3-input-image-alpha2/dist/style.css');


.your-class {
  width: 200px;
  height: 200px;

}
.second-class {
  width: 400px;
  height: 400px;
}
 .second-class .preview {
  background-color: #e1f2f7;
  margin-top: 20px;
  border-radius: 20px;
}
 
 
input[type=text] {
  margin-bottom: 20px;
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
