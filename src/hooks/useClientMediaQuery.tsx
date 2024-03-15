"use client"

import { useEffect, useState } from 'react';


/** 클라이언트 사이드에서 호출할 때는 아래의 function을
 * "use client"
 *
 * import { useClientMediaQuery } from '@/hooks/useClientMediaQuery';
 *
 * const isMobile = useClientMediaQuery('(max-width: 600px)');
 * 와 같이 호출한다.
  * @param query
 */
export function useClientMediaQuery(query:string) {
    const [matches, setMatches ] = useState<boolean | null>(null);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const handleMatchChange = (e:any) => {
            setMatches(e.matches);
        };

        mediaQueryList.addEventListener('change', handleMatchChange);
        setMatches(mediaQueryList.matches);

        return () => {
            mediaQueryList.removeEventListener('change', handleMatchChange);
        };
    }, [query]);

    return matches;
}