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
    colors:string[];
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
    // changeRequestResult: (flag : { message: string; result: boolean; }) => void;
}

export interface PutModalProps {
    toggleHandler: () => void;
    guestBook? : GuestBook;
    colors:string[]
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
}

export interface PermitCodeCheckProps {
    guestBookId : string,
    toggleHandler: () => void;
    authorityConfirm?: () => void;
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
}

export interface DeleteModalProps {
    guestBookId : string,
    toggleHandler: () => void;
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
}

