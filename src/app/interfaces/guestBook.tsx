
export interface GuestBook {
    id? : string;
    permitCode? : string;

    title: string;
    writer: string;
    contents: string;
    color : string;

    createdTime? : string;
}

export type GuestBookProps = {
    guestBooks: GuestBook[];
    guestBook? : GuestBook;
}

export interface GuestBookContextProps {
    guestBooks: GuestBook[];
    fetchGuestBooks: (orderDirection: string, orderField: string, writer?: string) => void;

    orderDirection: string;
    orderField: string;
    changeOrderDirection: () => void;
    changeOrderField: (field: string) => void;

    searchWriter: string;
    changeSearchWriter: (writer : string) => void;

    isLoading: boolean;
    error: string;
}