// GuestBookContext.js
import React, {createContext, useContext, useState, useCallback} from 'react';
import {GET} from '@/app/api/guest-book/route';
import {GuestBook} from "@/app/interfaces/guestBook";

/*Context로 활용할 Props interface 정의*/
interface GuestBookContextProps {
    guestBooks: GuestBook[];

    orderDirection : string;
    orderField : string
    isLoading: boolean;
    error: string;

    fetchGuestBooks: (orderDirection: string, orderField : string) => void;
    changeOrderDirection: () => void;
    changeOrderField: (field: string) => void;
}

//Context 생성.
//interface 초기 값을 설정하지 않고 편의를 위한 undefined type 설정
const GuestBookContext
    = createContext<GuestBookContextProps | undefined>(undefined);

//생성한 context를 다른 component에서 사용할 수 있도록 useContext return.
export const useGuestBookContext = (): GuestBookContextProps => {
    const context = useContext(GuestBookContext);
    if (!context) {
        throw new Error('useGuestBookContext must be used within a GuestBookProvider');
    }
    return context;
};


export function GuestBookProvider({children}: { children: React.ReactNode; }) {

    const [guestBooks, setGuestBooks] = useState<GuestBook[]>([]);
    const [orderDirection, setOrderDirection] = useState("DESC");
    const [orderField, setOrderField] = useState("createdTime");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchGuestBooks = useCallback(
        async (direction : string, field : string): Promise<void> => {

            setIsLoading(true);

            console.log(direction)
            console.log(field)
            try {
                const response = await GET(direction, field);

                if (!response.ok) {
                    const {error} = await response.json();
                    throw new Error(error);
                }

                const data: GuestBook[] = await response.json();
                setGuestBooks(data);
            } catch (error: any) {
                setError(error.message);
            }
            setIsLoading(false);
        }, []);

    //방향은 Toggle 방식으로 작동 시키기 위해 argument 없이
    const changeOrderDirection = ()  => {
        if(orderDirection === "DESC"){
            setOrderDirection("ASC")
        }else{
            setOrderDirection("DESC")
        }
    }

    //클릭한 검색 조건을 Arg로 받아와 변경
    const changeOrderField = (field : string)  => {
        setOrderField(field);
    }

    const contextValue: GuestBookContextProps = {
        guestBooks,
        orderDirection,
        orderField,
        isLoading,
        error,
        changeOrderDirection,
        changeOrderField,
        fetchGuestBooks,
    };

    return (
        <GuestBookContext.Provider value={contextValue}>
            {children}
        </GuestBookContext.Provider>
    );

}
