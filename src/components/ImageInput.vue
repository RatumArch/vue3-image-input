<template>

    <div class="image-input" :class="{resizable: resizable}" >
        <label :for="`image-input-opaq-${nameId ?? inputId}`" :id="`label-input-opaq-${nameId ?? inputId}`" class="preview-label">
            <span v-if="filename.length===0" class="placeholder">{{textPlaceholder}}</span>
            
            <img v-if="fileType==='image'||fileType===null" :src="blobUrl ?? imagePlaceholder" :alt="alt" class="preview"/>
            <audio v-if="fileType==='audio'" :src="blobUrl ?? imagePlaceholder" class="preview" controls ></audio>
            <video v-if="fileType==='video'" :src="blobUrl ?? imagePlaceholder" class="preview" controls ></video>
            <iframe v-if="fileType==='pdf'" :src="blobUrl ?? imagePlaceholder" :alt="alt" class="preview" ></iframe>
            
            <div class="filename">{{filename}}</div>
        </label>
        <input type="file" :id="`image-input-opaq-${nameId ?? inputId}`" :name="nameId" :accept="accept" ref="input" @input="takeFile"/>
        
    </div>

</template>

<script setup lang="ts" >
import { defineProps, ref, withDefaults } from 'vue'
import type { StyleValue } from 'vue'
//import type { ImageInputProps  } from '@/types/props'
import type { Ref } from 'vue'
//import "../style.css"
import { getFileMimeType } from '../utils'
import type { mimetype } from '../utils'

interface ImageInputProps {
    /** 
     * The same "accept" attribute as the one used in traditional file input.
     * @example accept="image/*, video/*"
     * @description [See possible values on MDN](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/file#accept)
     */
    accept: string,
    /** @description Alternative text if the preview image doesn't appear */
    alt?: string,
    /**
     * Value for the attribute "name" of the input.
     * It will also be bind to the "id attribute", so you should add this props if you use multiple instance of ImageInput in the same page
     */
    nameId?: string,
    
    /**  @description Original image for preview */
    imagePlaceholder?: string,
    textPlaceholder?: string

    resizable?: boolean
}

    const props = withDefaults(defineProps<ImageInputProps>(), {
        accept: "image/*, audio/*, video/*",
        alt: "Insérer un fichier ici",
        imagePlaceholder: "/picture-icon2.svg",
        textPlaceholder: "Cliquez ou faîtes glisser",
        resizable: false
    })

    const date = new Date()
    const currentTime = `${date.getDate()}${date.getHours()}${date.getMinutes()}`
    const inputId = ref(currentTime)

    const width: Ref = ref({ little: '50px', medium: '200px', large: '600px' })
    
    const blobUrl = ref<string|null>(null)

    const input= ref<any>(null)


    const value = input.value
    const files = value?.files
    const filename = ref<string>("")
    const fileType = ref<mimetype|null>(null)


    const takeFile = (event: any) => {
        let fileUploaded: File = event.target.files[0]
        console.log(fileUploaded);
        
        filename.value = fileUploaded.name
        fileType.value = getFileMimeType(fileUploaded)
        console.log(fileType.value);
        
        blobUrl.value= URL.createObjectURL( fileUploaded)
    }

    defineExpose({ filename, fileType, value })

</script>

<style scoped>
.image-input {
    display: block;
    padding: 15px;
    resize: none;
    
}
input[type=file] {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    cursor: pointer;
}
.placeholder {
    letter-spacing: 1px;
}

.preview-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
.preview {
    width: 100%;
    height: 100%;
    border-style: dashed; 
    ;
    border-radius: 10px;
    border-color: #051622;
}
.resizable { 
    overflow: hidden; resize: both; border-style: dashed; border-width: 2px;
}

</style>
