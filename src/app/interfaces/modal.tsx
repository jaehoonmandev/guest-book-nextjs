import {GuestBook} from "@/app/interfaces/guestBook";

export interface ModalProps {
    toggleHandler: () => void;

    authorityConfirm?: () => void;
    guestBookId?:string;

    guestBook? : GuestBook;
    type? : string;
}

export interface PostModalProps{
    toggleHandler: () => void;
    colors : {
        color : string,
        value: string
    }[];
}

export interface PutModalProps {
    toggleHandler: () => void;
    guestBook? : GuestBook;
    colors : {
        color : string,
        value: string
    }[];
}

export interface PermitCodeCheckProps {
    guestBookId : string,
    toggleHandler: () => void;

    authorityConfirm?: () => void;

}

