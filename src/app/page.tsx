import {isMobileDevice} from "@/lib/isMobileDevice";
import NestedGuestBook from "@/app/components/guest-book/nestedGuestBook";

export default function Home() {

    // 서버 사이드에서 pre-rendering 할 때 모바일 버전인지 확인
    const isMobile = isMobileDevice();

    return(
            <NestedGuestBook isMobile={isMobile}/>
    )
};


