<template>

    <div class="image-input" :class="{ focused: onFocus, resizable: resizable}" >
        <label :for="`image-input-opaq-${name}`" :id="`label-input-opaq-${name}`" class="preview-label">
            <span v-if="filename.length===0" class="placeholder">{{textPlaceholder}}</span>
            
            <img v-if="fileType==='image'||fileType===null" :src="blobUrl ?? imagePlaceholder" :alt="alt" class="preview"/>
            <audio v-if="fileType==='audio'" :src="blobUrl ?? imagePlaceholder" class="preview" controls ></audio>
            <video v-if="fileType==='video'" :src="blobUrl ?? imagePlaceholder" class="preview" controls ></video>
            <object type="application/pdf" v-if="fileType==='pdf'" :data="blobUrl ?? imagePlaceholder" :alt="alt" class="preview" ></object>
            
            <div class="filename">{{filename}}</div>
        </label>
        <input type="file"
                :id="`image-input-opaq-${name}`" :name="name"
                :accept="accept" ref="input"
                @input="emitInput" @change="emitChanges"
                @focus="emitFocus" @focusout="focusOff"
                 />
        
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

    modelValue?: string,
    /**
     * Value for the attribute "name" of the input.
     * It will also be bind to the "id attribute"
     */
    name: string,
    
    /**  @description Original image for preview */
    imagePlaceholder?: string,
    textPlaceholder?: string

    resizable?: boolean
}
const emit = defineEmits([ 'change', 'focus', 'focusIn', 'focusOut', 'input', 'update:modelValue' ])

    const props = withDefaults(defineProps<ImageInputProps>(), {
        accept: "image/*, audio/*, video/*",
        alt: "Insérer un fichier ici",
        imagePlaceholder: "/picture-icon2.svg",
        textPlaceholder: "Cliquez ou faîtes glisser",
        resizable: false
    })
    
const blobUrl = ref<string|null>(null)

const input= ref<any>(null)

const filename = ref<string>("")
const fileType = ref<mimetype|null>(null)

const onFocus = ref<boolean>(false)


const emitInput = (event: any) => {
    let fileUploaded: File = event.target.files[0]
    
    filename.value = fileUploaded.name
    fileType.value = getFileMimeType(fileUploaded)
    
    blobUrl.value= URL.createObjectURL( fileUploaded)

    emit('update:modelValue', filename.value)
    emit('input')
}
const emitChanges = (event: any) => { emit('change') }
const emitFocus = () => { emit('focus'); onFocus.value=true; }
const focusOff = () => { onFocus.value=false }

defineExpose({ filename, fileType })

</script>

<style scoped>
.image-input {
    display: block;
    padding-top: 15px;
    padding: 20px;
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
    border-style: dotted; 
    border-radius: 10px;
    border-color: #051622;
}
.focused {
    border-style: dashed;
    border-width: 2px;
    border-color: blue;
    box-shadow: 0px 0px 4px 2px lightblue;
}
.resizable { 
    overflow: hidden; resize: both; border-style: dashed; border-width: 2px;
}

</style>
