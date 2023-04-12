import { GenericObject, PreviewBook, ErrorMessage } from 'types/types'
import React, { KeyboardEvent, useState } from 'react'
import Layout from 'components/Layout'
import Book from 'components/Book'

type ObjectPreviewBooks = GenericObject<PreviewBook[]>

type Props = {
    data: ObjectPreviewBooks & ErrorMessage
}

export default function Index({ data }: Props) {

    const { booksData } = data
    const [booksDataArray, setBooksData] = useState<PreviewBook[] | undefined>(booksData)
    const [searchValue, SetSearchValue] = useState<string>('')
    const searchDefault = 'cat'

    const searchBooks = async () => {
        const data = await (await fetch(`http://localhost:3000/api/getBooks?search=${searchValue || searchDefault}`)).json()
        setBooksData(data.booksData)
    }

    const isPressEnter = (event: KeyboardEvent, triggerFunc: Function) => {
        if (event.key === 'Enter') {
            triggerFunc()
        }
    }

    if (booksData) {
        return (
            <Layout>
                <div className="text-center h-screen">
                    <div className='p-2 group w-1/3 mx-auto my-8 flex'>
                        <input className='border-2 group-hover:border-slate-800 rounded p-1 w-full' onKeyDown={(e) => isPressEnter(e, searchBooks)} id='search' type="text" placeholder='search' onChange={(e) => SetSearchValue(e.target.value)} value={searchValue} />
                        <button onClick={searchBooks} className='mx-2 rounded hover:text-emerald-500'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </button>
                    </div>

                    {booksDataArray ? (
                        //  have data
                        <div className='flex flex-wrap justify-center gap-12'>
                            {booksDataArray.map((book: PreviewBook, index: number) => (
                                <Book key={index} book={book} />
                            ))}
                        </div>
                    ) : (
                        // no data
                        <div className='text-slate-500'>no data</div>
                    )}
                </div>
            </Layout>
        )
    }

    // fetch error
    return <Layout>
        <div className='flex flex-col xl:flex-row justify-center p-3 text-center'>
            <h1>{data.errorMessage}</h1>
        </div>
    </Layout>
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