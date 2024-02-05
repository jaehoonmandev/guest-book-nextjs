
import type {GuestBook} from '@/app/interfaces/guestBook'
import {NextRequest, NextResponse} from "next/server";
import {PutFormData} from "@/app/interfaces/modal";


/**
 *  방명록 데이터 가져오기
 * @param direction : AES, DESC
 * @param field : 정렬 기준 field(date,title,writer)
 * @constructor
 */
export async function GET(orderDirection:string, orderField : string) {
    //let url = "http://localhost:8080/guestbook"

    //정렬할 요소 RequestParam으로 넣어주기
    /*let direction = "ASC";
    let field = "title";*/

    let url =
        `http://localhost:8080/guestbook`
        +`?orderDirection=${orderDirection}&orderField=${orderField}`;

    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('데이터를 불러올 수 없습니다.');
            }
            return response.json();
        })
        .then((data) => {
            const transformCards = data.map((card: GuestBook) => ({
                id: card.id,
                title: card.title,
                writer: card.writer,
                contents: card.contents,
                createdTime: card.createdTime,
            }));

            return NextResponse.json(transformCards, { status: 200 });
        })
        .catch((error) => {
            return NextResponse.json(
                { error: '서버에서 데이터를 불러올 수 없습니다.' },
                { status: 500});
        });
}

//TODO : 작성자로 GET

/*export async function POST(
    req: NextRequest){*/
export async function POST(
    //formData : PostGuestBook
formData : any
) {
    //const data = await formData.json()

    try{
        const response = await fetch('http://localhost:8080/guestbook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

    }catch(error){

    }
    return new NextResponse("Thank you")

}

export async function PUT(
    formData : PutFormData){
    const data = formData;
    const id = data.id;

    try{
        const response = await fetch(`http://localhost:8080/guestbook/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

    }catch(error){

    }
    return new NextResponse("Thank you")

}


export async function DELETE(
    req: NextRequest
) {
    const id = await req.json()

    try{
        const response = await fetch( `http://localhost:8080/guestbook/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

    }catch(error){

    }
    return new NextResponse("Thank you")

}