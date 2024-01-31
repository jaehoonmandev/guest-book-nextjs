import React from "react";

export type GuestBook = {
    id: string;
    title: string;
    writer: string;
    contents: string;
    createdTime: string;
}

export type GuestBookProps = {
    guestBooks: GuestBook[];
}

export type ModalContents = {
    permitCode: React.ReactNode | null;
    id: React.ReactNode | null;
    submitButtonType: string;
    httpMethod: string

}

export type ModalProps = {
    toggleHandler: () => void;
    guestBookData : GuestBook | null;
    type : string;
}