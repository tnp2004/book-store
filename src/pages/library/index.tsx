import Layout from 'components/Layout'
import React, { useState } from 'react'
import { BooksObj, Item } from 'types/types'
import Image from 'next/image'
import Book from 'components/Book'

type Props = {
    data: BooksObj
}

export default function Index({ data }: Props) {

    const [booksData, setBooksData] = useState<Item[]>(data.items)
    const [searchValue, SetSearchValue] = useState('')


    const searchBooks = async () => {
        const data = await (await fetch(`http://localhost:3000/api/getBooks?search=${searchValue}`)).json()
        setBooksData(data.items)
    }

    return (
        <Layout>
            <div className="text-center">
                <h1 className='text-rose-500 text-3xl'>Library page</h1>
                <div className='p-2 group w-max mx-auto'>
                    <input type="text" className='border-2 border-r-0 group-hover:border-slate-800 rounded-l p-1' placeholder='search' onChange={(e) => SetSearchValue(e.target.value)} value={searchValue} />
                    <button className='border-2 border-l-0 group-hover:border-slate-800 p-1 bg-sky-300 rounded-r' onClick={searchBooks}>search</button>
                </div>
                {booksData ? (
                    //  have data
                    <ul className='flex flex-wrap justify-center gap-12 mt-32'>
                        {booksData.map((book: Item, index: number) => (
                           <Book key={index} book={book} />
                        ))}
                    </ul>
                ): (
                    // no data
                    <div>no data</div>
                )}
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