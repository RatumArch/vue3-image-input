<template>

    <div class="image-input" :class="{ focused: onFocus, resizable: resizable}" >
    
        <label :for="`image-input-opaq-${name}`" :id="`label-input-opaq-${name}`" class="preview-label">
            <span v-if="filename.length===0" class="placeholder">{{textPlaceholder}}</span>

            <img v-if="fileType==='image'||fileType===null" :src="blobUrl ?? imagePlaceholder" :alt="alt" class="preview"/>
            <audio v-if="fileType==='audio'" :src="blobUrl ?? imagePlaceholder" class="preview" controls ></audio>
            <video v-if="fileType==='video'" :src="blobUrl ?? imagePlaceholder" class="preview" controls ></video>
            <object type="application/pdf" v-if="fileType==='pdf'" :data="blobUrl ?? imagePlaceholder" :alt="alt" class="preview" ></object>
            
            <!-- @click.*prevent* is necessary instead of @click in order to block unwanted click events -->
            <img v-if="closeButton" alt="close" :src="closeIcon" class="close-button" :class="{inactive: filename.length===0 }" @click.prevent="closeFile" />

            <div class="filename">{{filename}}</div>
        </label>
        <input type="file" ref="input"
                :id="`image-input-opaq-${name}`" :name="name"
                :accept="accept"
                @input="emitInput" @change="emitChanges"
                @focus="emitFocus" @focusout="focusOff"
                :capture="capture"
                 />
        
    </div>

</template>

<script setup lang="ts" >
import { ref, withDefaults } from 'vue'
import type { StyleValue } from 'vue'
//import type { ImageInputProps  } from '@/types/props'
import { EmitEvents } from '../constants/events'
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
    capture?: any,
    closeButton?: boolean,
    /** Path to custom close icon */
    closeIcon?: string,
    /** value for v-model */
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
const emit = defineEmits([ EmitEvents.CHANGE, EmitEvents.FOCUS, 'focusIn', 'focusOut', EmitEvents.INPUT, `${EmitEvents.UPDATE}:modelValue`, EmitEvents.WITHDRAW ])

const props = withDefaults(defineProps<ImageInputProps>(), {
    accept: "image/*, audio/*, video/*",
    alt: "Insérer un fichier ici",
    capture: false,
    closeButton: true,
    closeIcon: '/close.svg',
    imagePlaceholder: "/picture-icon2.svg",
    name: 'a',
    textPlaceholder: "Cliquez ou faîtes glisser",
    resizable: false
})
if(props.name.length===0) throw new Error("Prop 'name' is required and must not be empty");
    
const updateModelValue: any = `${EmitEvents.UPDATE}:modelValue`
const blobUrl = ref<string|null>(null)

const input= ref<HTMLInputElement|null>(null)
// @ts-ignore
const fileUploaded = ref<File>(null)
const filename = ref<string>("")
const fileType = ref<mimetype|null>(null)

const onFocus = ref<boolean>(false)


const emitInput = (event: any) => {
    fileUploaded.value = event.target.files[0]
    
    filename.value = fileUploaded.value?.name ?? ""
    fileType.value = getFileMimeType(fileUploaded.value)
    
    blobUrl.value= URL.createObjectURL( fileUploaded.value)

    emit(updateModelValue, filename.value)
    emit(EmitEvents.INPUT)
}
const emitChanges = (event: any) => { emit(EmitEvents.CHANGE) }
const emitFocus = () => { emit(EmitEvents.FOCUS); onFocus.value=true; }
const focusOff = () => { onFocus.value=false }

const closeFile = () => {
    // The events onWithdraw the file isn't here anymore
    emit(EmitEvents.WITHDRAW, fileUploaded.value)
    filename.value=""
    blobUrl.value=null
    emit(EmitEvents.CHANGE);
    emit(updateModelValue)
    }

defineExpose({ filename, fileType })

</script>

<style scoped >
.image-input {
    display: block;
    padding: 20px;
    resize: none;
    background-color: #FDF1B8;
    border-radius: 20px;
    overflow: hidden;
        
}
input[type=file] {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    cursor: pointer;
}

.filename {
    letter-spacing: 1px;
    font-weight: lighter;
    font-family: 'Courier New', Courier, monospace;
}
.placeholder {
    letter-spacing: 1px;
    opacity: 0.4;
    text-align: center;
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
    border-radius: 40px;
    border-color: #051622;
    background-color: white;
}
.close-button {
    margin-top: -20px;
    margin-left: 95%;
    background-color: #051622;
    width: 30px;
    height: 30px;
    cursor: pointer;
    border-radius: 20px;
    border-style: solid;
    border-color: black;
    border-width: 2px;
    box-shadow: 0px 0px 4px 3px white;
}
.close-button:hover {
    border-width: 3px;
}
.close-button.inactive {
    display: none;
}
.focused {
    border-style: dashed;
    border-width: 2px;
    border-color: blue;
    box-shadow: 0px 0px 4px 2px lightblue;
}
.resizable { 
    resize: both; 
    border-style: dashed; border-width: 2px;
}

</style>
