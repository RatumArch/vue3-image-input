<template>

    <div class="image-input" :style="{width: width[format]}">
        <label :for="`image-input-opaq-${inputId}`" class="preview-label">
            <span v-if="filename.length===0" class="placeholder">{{textPlaceholder}}</span>
            <img v-if="fileType==='image'||fileType===null" :src="blobUrl ?? imagePlaceholder" :alt="alt" class="preview"/>
            <video v-if="fileType==='video'" :src="blobUrl ?? imagePlaceholder" class="preview" controls ></video>
            <iframe v-if="fileType==='pdf'" :src="blobUrl ?? imagePlaceholder" :alt="alt" class="preview" ></iframe>
            <div class="filename">{{filename}}</div>
        </label>
        <input type="file" :id="`image-input-opaq-${inputId}`" accept="image/*, video/*" ref="input" @input="takeFile"/>
        
    </div>

</template>

<script lang="ts" >
import { defineComponent, ref } from 'vue'
import type { Ref } from 'vue'
//import "../style.css"
import { getFileMimeType } from '../utils'
import type { mimetype } from '../utils'

const IMAGE='image'
const VIDEO='video'
const PDF='pdf'

export default defineComponent({
    name: 'ImageInput',
    props: { 
        alt: { type: String, default: 'Insérer image ici', required: false},
        accept: { type: String, required: false },
        /** Peut être égal l'une de ces ttrois bvaleurs : 'little', 'medium', 'large' )  */
        format: { 
            type: String, default: 'large',
            validator: (value: string) => ['little', 'medium', 'large'].includes(value) 
            },
        imageInputId: {type: String, default: null, required: false },
        imagePlaceholder: { type: String, default: './picture-icon2.svg', required: false},
        textPlaceholder: { type: String, default: 'Cliquez ou faîtes glisser', required: false}   
    },
    
    setup(props) {
        const date = new Date()
        const currentTime = `${date.getDate()}${date.getHours()}${date.getMinutes()}`
        const inputId = ref(props.imageInputId ?? currentTime)
        

        const width: Ref = ref({ little: '50px', medium: '200px', large: '600px' })
        
        const blobUrl = ref<string|null>(null)

        const input= ref<any>(null)

        const files = input.value?.files
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
        return { width, blobUrl, files, filename, fileType, inputId, takeFile }
    }
})
</script>

<style scoped>
.image-input {
    display: block;
    overflow: hidden;
    resize: both;
    border-style: none;
}
input[type=file] {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    border-style: dashed;
    cursor: pointer;
}
.preview-label {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 90%;
    cursor: pointer;
}
.preview {
    width: 90%;
    height: 90%;   
    border-style: dashed; 
}
</style>
