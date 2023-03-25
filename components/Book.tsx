import React from 'react'
import Image from 'next/image'
import { PreviewBook } from 'types/types'
import Link from 'next/link'

type Props = {
    book: PreviewBook
}

export default function Book({ book }: Props) {

    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'

    const { id, title, authors, imageLinks } = book

    return (
        <Link href={`/library/${id}`}>
            <div className='p-3 border-2 w-60 h-72 hover:bg-gradient-to-b from-cyan-300 to-blue-300'>
                <label className='font-bold'>{title}</label>
                <div className='relative p-1 w-48 h-48 mx-auto my-2'>
                    <Image priority src={`${imageLinks?.smallThumbnail || defaultBookImage}`} alt={title} className='mx-auto' fill={true} sizes='1' style={{objectFit: 'contain'}} />
                </div>
                <p>{authors}</p>
            </div>
        </Link>
    )
}