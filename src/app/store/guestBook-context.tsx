// guestBook-context.tsx
import { createContext, useContext } from 'react';

import { GuestBookContextProps } from "@/app/interfaces/IguestBook";

/*Context로 활용할 Props interface 정의*/


//Context 생성.
//interface 초기 값을 설정하지 않고 편의를 위한 undefined type 설정
const GuestBookContext = createContext<GuestBookContextProps | undefined>(undefined);

//생성한 context를 다른 component에서 사용할 수 있도록 useContext return.
export const useGuestBookContext = (): GuestBookContextProps => {
    const context = useContext(GuestBookContext);
    if (!context) {
        throw new Error('useGuestBookContext must be used within a GuestBookProvider');
    }
    return context;
};

export default GuestBookContext;
