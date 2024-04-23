import {GuestBook} from "@/app/interfaces/IguestBook";

export interface ModalProps {
    toggleHandler: () => void;

    authorityConfirm?: (permitCode:string) => void;
    guestBookId?:string;

    guestBook? : GuestBook;
    type? : string;
}

export interface PostModalProps{
    toggleHandler: () => void;
    colors:string[];
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
    changeErrorMsg: (msg : string) => void;
    // changeRequestResult: (flag : { message: string; result: boolean; }) => void;
}

export interface PutModalProps {
    guestBook? : GuestBook;

    toggleHandler: () => void;
    colors:string[]
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
    changeErrorMsg: (msg : string) => void;
}

export interface DeleteModalProps {
    guestBook? : GuestBook;
    toggleHandler: () => void;
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
    changeErrorMsg: (msg : string) => void;
}


export interface PermitCodeCheckProps {
    authorityConfirm?: (permitCode:string) => void;

    guestBookId : string,
    toggleHandler: () => void;
    changeLoadingState: (flag : boolean) => void;
    changeRequestResult: (flag : boolean) => void;
    changeErrorMsg: (msg : string) => void;
}

