
import type { GuestBook } from '@/app/interfaces/guestBook'
import {NextRequest, NextResponse} from "next/server";


/*export async function GET() {
    try {
        const response =
            await fetch('http://localhost:8080/guestbook')

        if (!response.ok) {
            throw new Error('데이터를 불러올 수 없습니다.');
        }
        const data = await response.json();

        const transformCards = data.map((card: GuestBook) => ({
            id: card.id,
            title: card.title,
            writer: card.writer,
            contents: card.contents,
            createdTime: card.createdTime
        }));

        return NextResponse.json(transformCards, { status: 200 })
    }
    catch (error : any) {
        return NextResponse.json({error : error.message}, { status: 500 })
    }
}*/

/**
 *  방명록 데이터 가져오기
 * @param direction : AES, DESC
 * @param field : 정렬 기준 field(date,title,writer)
 * @constructor
 */
export async function GET(direction:string, field : string) {
    //let url = "http://localhost:8080/guestbook"

    //정렬할 요소 RequestParam으로 넣어주기
    /*let direction = "ASC";
    let field = "title";*/

    let url = `http://localhost:8080/guestbook?direction=${direction}&field=${field}`;

    return fetch(url)
        .then((response) => {
            console.log(response)
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

export async function POST(
    req: NextRequest){
    const data = await req.json()

    try{
        const response = await fetch('http://localhost:8080/guestbook', {
            method: 'POST',
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

export async function PUT(
    req: NextRequest){
    const data = await req.json()
    const id = data.id;
    console.log(id)
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