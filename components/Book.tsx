import { PreviewBook } from 'types/types'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
    book: PreviewBook
}

export default function Book({ book }: Props) {

    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'

    const { id, title, authors, imageLinks } = book

    return (
        <Link href={`/library/${id}`}>
            <motion.div className='p-3 border-2 w-60 h-72 rounded-md box-content flex flex-col justify-between bg-slate-50' whileHover={{
                position: 'relative',
                zIndex: 1,
                scale: [1, 1.4, 1.2],
                transition: {
                    duration: .2
                }
            }}>
                <label className='font-bold'>{title}</label>
                <div className='relative p-1 w-48 h-48 mx-auto my-2'>
                    <Image priority src={`${imageLinks?.smallThumbnail || defaultBookImage}`} alt={title} className='mx-auto' fill={true} sizes='1' style={{objectFit: 'contain'}} />
                </div>
                <p>{authors}</p>
            </motion.div>
        </Link>
    )
}