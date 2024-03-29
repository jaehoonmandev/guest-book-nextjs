import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    // Font
    // const interSemiBold = fetch(
    //     new URL('./Inter-SemiBold.ttf', import.meta.url)
    // ).then((res) => res.arrayBuffer())

    const url = `https://guestbook.jaehoonman.site/`; // 4. params로 받은 id값으로 해당 게시글 내용을 조회한다.
    const post = await fetch(url).then((res) =>
        res.json()
    )


    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 128,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {post.title}
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
            // fonts: [
            //     {
            //         name: 'Inter',
            //         data: await interSemiBold,
            //         style: 'normal',
            //         weight: 400,
            //     },
            // ],
        }
    )
}