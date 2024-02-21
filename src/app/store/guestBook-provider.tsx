// guestBook-provider.tsx
import React, { useState, useCallback } from 'react';
import GuestBookContext  from './guestBook-context';
import {GuestBook, GuestBookContextProps} from "@/app/interfaces/guestBook";
import {GET} from "@/app/fetch/fetchGuestBook";


//일부러 로딩시키기 위한 타이머설정
//const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));

export function GuestBookProvider({ children }: { children: React.ReactNode; }) {

    const [guestBooks, setGuestBooks] = useState<GuestBook[]>([]);

    // 데이터 fetch 핸들링 State
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    //정렬 및 검색 State
    const [orderDirection, setOrderDirection] = useState("DESC");
    const [orderField, setOrderField] = useState("createdTime");
    const [searchWriter, setSearchWriter] = useState("");

    //paging state
    const [page, setPage] = useState(0);

    /**
     * 방명록 데이터를 불러온다.
     * @param direction :  정렬 방향
     * @param field : 정렬 기준 필드
     * @param writer : 작성자로 검색 시(기본 값 "" / 필수 X)
     */
    const fetchGuestBooks = useCallback(
        async (direction: string, field: string, writer : string = "", page : number = 0): Promise<void> => {
            setIsLoading(true);

            try {
                //지연 시간 추가
                //await delay(1000);

                //const response = await GET(direction, field, writer);
                const response = await GET(direction, field, writer, page);

                if (!response.ok) {
                    const { error } = await response.json();
                    throw new Error(error);
                }

                const data: GuestBook[] = await response.json();

                //이전 상태의 값에 새로 읽어온 배열을 붙인다.
                if(page > 0){
                    setGuestBooks((prevState)=> [...prevState, ...data]);
                }else {
                    setGuestBooks(data);
                }

            } catch (error: any) {
                setError(error.message);
            }
            setIsLoading(false);
        }, []);

    /**
     * 방명록 데이터 정렬 방향을 바꾼다.
     * 방향은 Toggle 방식으로 작동 시키기 위해 argument 없이 호출된다.
     */
    const changeOrderDirection = () => {
        if (orderDirection === "DESC") {
            setOrderDirection("ASC")
        } else {
            setOrderDirection("DESC")
        }
    }

    /**
     * 방명록 데이터를 정렬하는 기준을 정한다.
     * @param field : order by 하려는 field의 값.
     */
    const changeOrderField = (field: string) => {
        setOrderField(field);
    }

    //작성자로 검색할 시 state 값 변경.
    const changeSearchWriter = (writer: string) => {
        setSearchWriter(writer);
    }

    //기준 페이지 값 변경
    const changePage = (page : number) => {
        setPage(page);
    }

    const contextValue: GuestBookContextProps = {
        guestBooks,
        fetchGuestBooks,

        orderDirection,
        orderField,
        changeOrderDirection,
        changeOrderField,

        searchWriter,
        changeSearchWriter,

        page,
        changePage,

        isLoading,
        error,
    };

    return (
        <GuestBookContext.Provider value={contextValue}>
            {children}
        </GuestBookContext.Provider>
    );
}
