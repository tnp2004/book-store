import React from 'react'
import Image from 'next/image'
import { Item } from 'types/types'
import Link from 'next/link'

type Props = {
    book: Item
}

export default function Book({ book }: Props) {

    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'

    return (
        <Link href={`/library/${book.id}`}>
            <label>{book.volumeInfo.title}</label>
            <div className='relative border-2 p-1 w-48 h-48'>
                <Image src={`${book.volumeInfo.imageLinks?.smallThumbnail || defaultBookImage}`} alt={book.volumeInfo.title} className='mx-auto w-auto h-auto' fill={true} objectFit='contain' />
            </div>
        </Link>
    )
}