import Layout from 'components/Layout'
import React, { useState } from 'react'
import { BooksObj, Item } from 'types/types'
import Image from 'next/image'

type Props = {
    data: BooksObj
}

export default function Index({ data }: Props) {

    const [booksData, setBooksData] = useState<Item[]>(data.items)

    return (
        <Layout>
            <div className="text-center">
                <h1 className='text-rose-500 text-3xl'>Library page</h1>
                <div className='p-2 group w-max mx-auto'>
                    <input type="text" className='border-2 border-r-0 group-hover:border-slate-800 rounded-l p-1' placeholder='search' />
                    <button className='border-2 border-l-0 group-hover:border-slate-800 p-1 bg-sky-300 rounded-r'>search</button>
                </div>
                <ul>
                    {booksData.map((val: Item, index: number) => (
                        <li key={index}>
                            <Image src={`${val.volumeInfo.imageLinks.thumbnail}`} alt="picture" className='mx-auto' width={128} height={192} />
                            {val.volumeInfo.title}</li>
                    ))}
                </ul>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {

    const data = await (await fetch('http://localhost:3000/api/getBooks')).json()

    return {
        props: {
            data
        }
    }
}