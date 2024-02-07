export interface PostFormData {
    title: string
    writer: string
    contents: string
    permitCode: string
    color:string
}

export interface PutFormData {
    id?: string
    title: string
    writer: string
    contents: string
    color:string
}