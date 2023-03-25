import Layout from 'components/Layout'
import React, { KeyboardEvent, useState } from 'react'
import { BooksObj, Item } from 'types/types'
import Book from 'components/Book'

type Props = {
    data: BooksObj
}

export default function Index({ data }: Props) {

    const [booksData, setBooksData] = useState<Item[]>(data.items)
    const [searchValue, SetSearchValue] = useState<string>('')


    const searchBooks = async () => {
        const data = await (await fetch(`http://localhost:3000/api/getBooks?search=${searchValue}`)).json()
        setBooksData(data.items)
    }

    const isPressEnter = (event: KeyboardEvent, triggerFunc: Function) => {
        if (event.key === 'Enter') {
            triggerFunc()
        }
    }

    return (
        <Layout>
            <div className="text-center">
                <h1 className='text-rose-500 text-3xl'>Library page</h1>
                <div className='p-2 group w-max mx-auto'>
                    <input onKeyDown={(e) => isPressEnter(e, searchBooks)} id='search' type="text" className='border-2 group-hover:border-slate-800 rounded p-1' placeholder='search' onChange={(e) => SetSearchValue(e.target.value)} value={searchValue} />
                </div>
                {booksData ? (
                    //  have data
                    <div className='flex flex-wrap justify-center gap-12 mt-32'>
                        {booksData.map((book: Item, index: number) => (
                            <Book key={index} book={book} />
                        ))}
                    </div>
                ) : (
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