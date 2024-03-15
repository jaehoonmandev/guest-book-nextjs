"use server"

import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

/**
 * 서버 사이드에서 호춣하여 Props로 넘겨줄 때는 아래의 function을 호출하여
 */
export const isMobileDevice = () => {
    if (typeof process === 'undefined') {
        throw new Error('[Server method] you are importing a server-only module outside of server');
    }

    const { get } = headers();
    const ua = get('user-agent');

    const device = new UAParser(ua || '').getDevice();

    return device.type === 'mobile';
};