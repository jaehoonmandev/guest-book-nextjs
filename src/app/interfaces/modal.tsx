import {GuestBook} from "@/app/interfaces/guestBook";


export interface PostFormData {
    title: string
    writer: string
    contents: string
    permitCode: string,
}

export interface PutFormData {
    id?: string;
    title: string
    writer: string
    contents: string
}

export type ModalProps = {
    toggleHandler: () => void;
    guestBook? : GuestBook;
    type? : string;
}

export interface ModalContextProps {
    isModalOpen? : boolean;
    portalElement? : Element | null;
    toggleHandler: () => void;
    //guestBook : GuestBook;
}