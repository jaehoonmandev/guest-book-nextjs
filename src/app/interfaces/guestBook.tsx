
export interface GuestBook {
    id? : string;
    permitCode? : string;

    title: string;
    writer: string;
    contents: string;
    createdTime? : string;
}

export type GuestBookProps = {
    guestBooks: GuestBook[];
    guestBook? : GuestBook;
}

export interface GuestBookContextProps {
    guestBooks: GuestBook[];
    orderDirection: string;
    orderField: string;
    isLoading: boolean;
    error: string;
    fetchGuestBooks: (orderDirection: string, orderField: string) => void;
    changeOrderDirection: () => void;
    changeOrderField: (field: string) => void;
}