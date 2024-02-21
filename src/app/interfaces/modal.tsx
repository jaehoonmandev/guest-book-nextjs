import {GuestBook} from "@/app/interfaces/guestBook";

export interface ModalProps {
    toggleHandler: () => void;

    authorityConfirm?: () => void;

    guestBook? : GuestBook;
    type? : string;
    colors? : {
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

