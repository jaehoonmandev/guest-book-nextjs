// guestBook-provider.tsx
import React, { useState, useCallback } from 'react';
import GuestBookContext  from './guestBook-context';
import {GuestBook, GuestBookContextProps} from "@/app/interfaces/guestBook";
import {GET} from "@/app/api/guest-book/route"; // 파일 경로에 맞게 수정

export function GuestBookProvider({ children }: { children: React.ReactNode; }) {

    const [guestBooks, setGuestBooks] = useState<GuestBook[]>([]);
    const [orderDirection, setOrderDirection] = useState("DESC");
    const [orderField, setOrderField] = useState("createdTime");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchGuestBooks = useCallback(
        async (direction: string, field: string): Promise<void> => {
            setIsLoading(true);

            try {
                const response = await GET(direction, field);

                if (!response.ok) {
                    const { error } = await response.json();
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
    const changeOrderDirection = () => {
        if (orderDirection === "DESC") {
            setOrderDirection("ASC")
        } else {
            setOrderDirection("DESC")
        }
    }

    //클릭한 검색 조건을 Arg로 받아와 변경
    const changeOrderField = (field: string) => {
        setOrderField(field);
    }

    const contextValue: GuestBookContextProps = {
        guestBooks,
        orderDirection,
        orderField,
        isLoading,
        error,
        fetchGuestBooks,
        changeOrderDirection,
        changeOrderField,
    };

    return (
        <GuestBookContext.Provider value={contextValue}>
            {children}
        </GuestBookContext.Provider>
    );
}
