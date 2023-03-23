import React from 'react'
import Image from 'next/image'
import { Item } from 'types/types'

type Props = {
    book: Item
}

export default function Book({ book }: Props) {

    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'

    return (
        <li className='border-2 p-1'>
            <Image src={`${book.volumeInfo.imageLinks?.smallThumbnail || defaultBookImage}`} alt={book.volumeInfo.title} className='mx-auto' width={128} height={192} />
            {book.volumeInfo.title}
        </li>
    )
}