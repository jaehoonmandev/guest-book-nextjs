/**
 * REST API의 컨셉에 맞지 않지만 서버와 interact 해야하는 기능.
 */

import Config from "../../../config/config.export";
import {NextResponse} from "next/server";


export async function CheckPermitCode(
        id: string,
        permitCode: string) {

    return fetch(Config().APIHost + `/checkPermitCode/${id}`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({permitCode})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then((result) => {
            return NextResponse.json({
                result: result
            }, {status: 200});
        })
        .catch((error) => {
            return NextResponse.json(
                {error: '서버 에러로 인증에 실패하였습니다.'},
                {status: 500});
        });
}