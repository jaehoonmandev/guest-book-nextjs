"use client"

import {GuestBookProvider} from "@/app/store/guestBook-provider";
import GuestBook from "@/app/components/guest-book/guestBook";

interface props {
    isMobile : boolean
}

/**
 * Nest 하여 Home에서 2번 호출한 이유는 모바일 디바이스 인지 서버 사이드에서 판단 하기 위해서
 * 클라이언트 사이드에서 useMediaQuery 등으로 렌더링하는 width 를 체크하는 방식이라면
 * pre-rendering 이후 모바일 체크를 하기 때문에 깜빡 거리는 것을 방지하기 위해서.
  */

export default function NestedGuestBook ({isMobile}:props){

    return(
        <GuestBookProvider>
            <GuestBook isMobile={isMobile} />
        </GuestBookProvider>
    )

}