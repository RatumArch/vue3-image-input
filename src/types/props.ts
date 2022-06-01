type formatType = 'little'|'medium'|'large'

type image = 'image/*'|'.jpg'|'.jpeg'|'.png'|'.svg'|'.avif'
type video = 'video/*'|'.mp4'|'.webm'

export interface ImageInputProps {
    /** @
     * The same accept attribut as the one used in traditional file input. 
     * See possible values here
     * https://developer.mozilla.org/fr/docs/Web/HTML/Element/Input/file#accept
     */
    accept: string,
    /** Alternative text if the preview image doesn't appear */
    alt?: string,
    format?: formatType
    /** Add this props if you use multiple instance of ImageInput in the same page */
    imageInputId: number|string|null,
    
    /** Original image for preview */
    imagePlaceholder: string,
    textPlaceholder: string

    resizable: boolean
}