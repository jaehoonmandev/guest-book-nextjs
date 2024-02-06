import {GuestBook} from "@/app/interfaces/guestBook";


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

export type ModalProps = {
    toggleHandler: () => void;
    guestBook? : GuestBook;
    type? : string;
    colors : {
        color : string,
        value: string
    }[];
}

export interface ModalContextProps {
    isModalOpen? : boolean;
    portalElement? : Element | null;
    toggleHandler: () => void;
    //guestBook : GuestBook;
}

