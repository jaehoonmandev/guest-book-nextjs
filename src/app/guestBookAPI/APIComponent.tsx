import type {GuestBook} from '@/app/interfaces/guestBook'
import {NextResponse} from "next/server";
import {PutFormData} from "@/app/interfaces/form";
import {dateConvert} from "@/app/utility/dateConvert";

//전역 변수 불러오기
import Config from "../../../config/config.export";


/**
 * REST API의 컨셉에 맞춘 GET,POST,PUT,DELETE 서버 메소드 모듈화.
 */


/**
 *  방명록 데이터 가져오기
 * @param orderDirection : 정렬 방향
 * @param orderField : 정렬 기준 필드.
 * @param writer : 작성자 검색 시 (필수 X, param에 넣지 않을 시 초기 값 "")
 * @param page : 나눠서 데이터 가져올 때 몇 번째 인지.
 */
export async function GET(
    orderDirection: string,
    orderField: string,
    writer: string,
    page: number) {

    //writer 정보가 있다면 작성자 검색 로직을 탈 수 있게.
    let url: string
    writer === ""
        ? (
            url = `?orderDirection=${orderDirection}&orderField=${orderField}&page=${page}&pageSize=${Config().pageSize}`

        )
        : (
            url = `/search?orderDirection=${orderDirection}&orderField=${orderField}&writer=${writer}&page=${page}&pageSize=${Config().pageSize}`
        )

    return fetch(Config().APIHost + url)
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
            return response.json();
        })
        .then((data) => {
            const transformCards : GuestBook[] = data.map((card: GuestBook) => ({
                id: card.id,
                title: card.title,
                writer: card.writer,
                contents: card.contents,
                createdTime: dateConvert(card.createdTime), //date 변경.
                color: card.color,
            }));
            return NextResponse.json(transformCards, {status: 200});
        })
        .catch((error) => {
            return NextResponse.json(
                {error: '서버 에러로 데이터를 불러올 수 없습니다.'},
                {status: 500});
        });
}


/*export async function POST(
    req: NextRequest){*/
/**
 * 방명록 등록하기
 * @param formData
 * @constructor
 */
export async function POST(
    //formData : PostGuestBook
    formData: any
) {

    return fetch(Config().APIHost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
            return NextResponse.json({result: '등록되었습니다.'}, {status: 200});
        }).then((result)=> {
            return NextResponse.json({
                    result: result,
                },
                {status: 200});
        })
        .catch((error) => {
            return NextResponse.json(
                {error: '서버 에러로 등록에 실패하였습니다.'},
                {status: 500});
        });

}

/**
 * 방명록 수정하기
 * @param formData
 * @constructor
 */
export async function PUT(
    formData: PutFormData) {

    const id = formData.id;

    return fetch(Config().APIHost + `/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
        //     return NextResponse.json({result: '수정되었습니다.'}, {status: 200});
        // })
            return response.json();
        })
        .then((result) => {
            return NextResponse.json({
                result: result,
            },
                {status: 200});
        })
        .catch((error) => {
            return NextResponse.json(
                {
                    // result:false,
                    // msg: '서버 에러로 수정에 실패하였습니다.'
                    error: '서버 에러로 수정에 실패하였습니다.'
                },
                {status: 500});
        });

}

/**
 * 방명록 삭제하기
 * @param id
 * @constructor
 */
export async function DELETE(
    id : string
) {

    return fetch(Config().APIHost+ `/${id}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error();
            }
            return NextResponse.json({result: '삭제되었습니다.'}, {status: 200});
        })
        .then((result) => {
            return NextResponse.json({
                    result: result,
                },
                {status: 200});
        })
        .catch((error) => {
            return NextResponse.json(
                {
                    error: '서버 에러로 삭제에 실패하였습니다.'
                },
                {status: 500});
        });
}