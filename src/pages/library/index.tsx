import { GenericObject, PreviewBook } from 'types/types'
import React, { KeyboardEvent, useState } from 'react'
import Layout from 'components/Layout'
import Book from 'components/Book'

type ObjectPreviewBooks = GenericObject<PreviewBook[]>

type Props = {
    data: ObjectPreviewBooks
}

export default function Index({ data: { booksData } }: Props) {

    const [booksDataArray, setBooksData] = useState<PreviewBook[]>(booksData)
    const [searchValue, SetSearchValue] = useState<string>('')

    const searchBooks = async () => {
        const data = await (await fetch(`http://localhost:3000/api/getBooks?search=${searchValue}`)).json()
        setBooksData(data.booksData)
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
                {booksDataArray ? (
                    //  have data
                    <div className='flex flex-wrap justify-center gap-12 mt-12'>
                        {booksDataArray.map((book: PreviewBook, index: number) => (
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

    const searchDefault = 'cat'
    const data = await (await fetch(`http://localhost:3000/api/getBooks?search=${searchDefault}`)).json()

    return {
        props: {
            data
        }
    }
}