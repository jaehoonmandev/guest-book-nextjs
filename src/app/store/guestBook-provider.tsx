// guestBook-provider.tsx
import React, {useCallback, useState} from 'react';
import GuestBookContext from './guestBook-context';
import {GuestBook, GuestBookContextProps} from "@/app/interfaces/IguestBook";
import {GET} from "@/app/guestBookAPI/APIComponent";
import makeDelay from "@/app/utility/makeDelay";


export function GuestBookProvider({children}: { children: React.ReactNode; }) {

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

    // 서버에서 모든 데이터를 가져왔는지 체크.
    const [isEndOfData, setIsEndOfData] = useState(false);

    //수정 및 추가 시 최신 데이터를 불러오기 위해 사용하는 단순 상태 변환 감지를 위한 State
    const [addOrModFlicker, setAddOrModFlicker] = useState(false)

    //가져 오려는 데이터의 길이를 읽어와 로딩 스켈레톤의 갯수를 정한다(보통 이렇게 안할텐데 ㅎㅎ...)
    //const [fetchedLength, setFetchedLength] = useState(1);

    /**
     * 방명록 데이터를 불러온다.
     * @param direction :  정렬 방향
     * @param field : 정렬 기준 필드
     * @param writer : 작성자로 검색 시(기본 값 "" / 필수 X)
     */

    const fetchGuestBooks = useCallback(
        async (): Promise<void> => {
            setIsLoading(true);

            //지연 시간 추가
            await makeDelay();
            try {
                // console.table([{orderDirection, orderField, searchWriter, page}]);
                //state 값으로 호출
                const response = await GET(orderDirection, orderField, searchWriter, page);

                if (!response.ok) {
                    const {error} = await response.json();
                    throw new Error(error);
                }

                const data: GuestBook[] = await response.json();

                //가져오는 데이터의 길이 state
                //setFetchedLength(data.length);

                // 초가 데이터 로드가 완료 되었다면 이전 상태의 값에 새로 읽어온 배열을 붙인다.
                // if (page > 0) {
                if (!isEndOfData && page > 0) {
                    setGuestBooks((prevState) => [...prevState, ...data]);
                } else {
                    setGuestBooks(data);
                }

            } catch (error: any) {
                //지연 시간 추가
                await makeDelay();
                setError(error.message);
            }

            setIsLoading(false);
        // 검색 조건과 page가 변경 될 때 마다 함수를 재생성한다(효율적일라나...)
        }, [orderDirection, orderField, searchWriter, page]);

    /**
     * 방명록 데이터 정렬 방향을 바꾼다.
     * 방향은 Toggle 방식으로 작동 시키기 위해 argument 없이 호출된다.
     */
    const changeOrderDirection = () => {
        setOrderDirection((prevState) => {
            if (prevState === "DESC") {
                return "ASC";
            } else {
                return "DESC";
            }
        })

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
    const changePage = (page: number) => {
        setPage(page);
    }

    //읽어오는 데이터가 더 없는지 끝인지 확인.
    const changeIsEndOfData = (flag : boolean) => {
        setIsEndOfData(flag);
    }

    //수정 및 추가 시 최신 데이터를 불러오기 위한 상태 값을 변경한다.
    const changeAddOrModFlicker = () => {
        setAddOrModFlicker((prevState) => !prevState);
    }

    const clearGuestBooks = () => {
        setGuestBooks([]);
    }

    // 검색 조건 및 방명록 데이터 변경 시 스크롤 최상단 이동 + 기존 데이터는 제거한다.(비동기)
    // const clearGuestBooks = async () => {
    //
    //     //스크롤이 내려 있을 시 스크롤을 위로 올려준 뒤 방명록 데이터들을 비워준다.
    //     await new Promise<void>((resolve) => {
    //         window.scrollTo({
    //                     top: 0,
    //                     behavior: 'smooth',
    //                 });
    //         // 현재 스크롤 위치가 최상단이 아니라면 올려주고.
    //         if (window.scrollY !== 0) {
    //             window.scrollTo({
    //                 top: 0,
    //                 behavior: 'smooth',
    //             });
    //
    //             //스크롤을 최상단으로 이동하였다면 promise를 해제하며 스크롤 이벤트를 제거한다
    //             const onScrollEnd = () => {
    //                 if (window.scrollY === 0) {
    //                     resolve();
    //                     window.removeEventListener('scroll', onScrollEnd);
    //                 }
    //             };
    //
    //             //스크롤이 최상단에 있는지 확인하는 이벤트 리스너를 등록한다.
    //             window.addEventListener('scroll', onScrollEnd);
    //         } else {
    //             // 최상단이라면 promise를 해제한다.
    //             resolve();
    //         }
    //     })
    //         .then(() => setGuestBooks([])); // 스크롤 promise가 완료 되었다면 값 비우기.
    //
    // }

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

        isEndOfData,
        changeIsEndOfData,

        addOrModFlicker,
        changeAddOrModFlicker,

        //fetchedLength,
        clearGuestBooks,

        isLoading,
        error,
    };

    return (
        <GuestBookContext.Provider value={contextValue}>
            {children}
        </GuestBookContext.Provider>
    );
}
