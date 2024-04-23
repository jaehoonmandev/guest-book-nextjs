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
    permitCode?:string
    writer?: string
    contents: string
    color:string
}

export interface ButtonProps{
    handleReset : () => void
    toggleHandler: () => void;
    action : string;
}