
import type { GuestBook } from '@/app/interfaces/guestBook'
import {NextRequest, NextResponse} from "next/server";


export async function GET() {
    try {
        const response = await fetch('http://localhost:8080/guestbook');

        if (!response.ok) {
            throw new Error('Something went wrong!');
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
    catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
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