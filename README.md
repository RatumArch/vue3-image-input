# vue3-image-input

File input for Vue 3.
=======
This enhanced file input enable to pick a file with a preview.

Support preview for :
* Image (jpg, png, svg)
* Video (mp4, webm)


<img src="./media/Screenshot_21.png" width="300">

# Install
```
npm i vue3-image-input
```
# Usage
1. Import the ImageInput component
```js
import { ImageInput } from 'vue3-image-input'
```
2. Import style.css in style block (don't work with *scoped* attribute)
  ```css
  @import '/node_modules/vue3-image-input/dist/style.css'; 
  ```



```html
<template>
  <h2>Upload a picture</h2>
  
  
  <ImageInput 
      format="large"
      textPlaceholder="Have you a picture ?"
      resizable
      class="a-class" />

  <button type="submit">Submit</button>
</template>

<style >
@import '/node_modules/vue3-image-input/dist/style.css';

.a-class {
  width: 200px;
  height: 400px;
  background-color: #ef0d50;
}
.a-class .preview {
  background-color: #e1f2f7;
  margin-top: 20px;
}

```

# Licence
MIT
