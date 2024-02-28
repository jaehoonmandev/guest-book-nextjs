
export interface GuestBook {
    id : string;
    permitCode? : string;

    title: string;
    writer: string;
    contents: string;
    color : string;
    //createdTime : String;
    createdTime : Date;
}

export type GuestBookProps = {
    guestBooks: GuestBook[];
    isLoading?: boolean;
    guestBook? : GuestBook;
}

export interface GuestBookContextProps {
    guestBooks: GuestBook[];
    fetchGuestBooks: (
        orderDirection: string,
        orderField: string,
        writer?: string,
        page?: number) => void;

    orderDirection: string;
    orderField: string;
    changeOrderDirection: () => void;
    changeOrderField: (field: string) => void;

    searchWriter: string;
    changeSearchWriter: (writer : string) => void;

    page: number;
    changePage: (page: number) => void;
    //fetchedLength: number;

    clearGuestBooks: () => void;

    isLoading: boolean;
    error: string;
}