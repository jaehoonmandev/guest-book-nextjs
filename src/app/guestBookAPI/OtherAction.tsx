/**
 * REST API의 컨셉에 맞지 않지만 서버와 interact 해야하는 기능.
 */
import {host} from "@/app/components/common/globalVar";
import {NextResponse} from "next/server";


export async function CheckPermitCode(
        id: string,
        permitCode: string) {

    return fetch(host + `/checkPermitCode/${id}`,{
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
                {error: '인증 서버와 문제가 있...'},
                {status: 500});
        });
}