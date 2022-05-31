export type mimetype = 'image'|'video'|'pdf'

/** Split a str by slash and extract mime type */
export function getMimeType(type: string): mimetype {
    const splitType: string[] = type.split('/');
    if(splitType[0]!=='application') {
        return <mimetype>splitType[0]
    }
    else {
        return <mimetype>splitType[1] 
    }
}
/**
 * Extract type of a file by calling getMimeType
 * @param file 
 * @returns 
 */
export function getFileMimeType(file: File): mimetype {
    return getMimeType(file.type)
}