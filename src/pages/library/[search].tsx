import Layout from 'components/Layout'
import React, { useContext, useState } from 'react'
import { BooksObj, Item } from 'types/types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetStaticPropsContext, GetStaticPropsResult } from 'next'

type Props = {
    data: BooksObj
}

type SearchParams = {
    search: string
}

export default function Search({ data }: Props) {

    const [booksData, setBooksData] = useState<Item[]>(data.items)
    const router = useRouter()
    const { search } = router.query
    const [searchWord, setSearchWord] = useState(search)

    return (
        <Layout>
            <div className="text-center">
                <h1 className='text-rose-500 text-3xl'>Library page</h1>
                {searchWord}
                <div className='p-2 group w-max mx-auto'>
                    <input type="text" className='border-2 border-r-0 group-hover:border-slate-800 rounded-l p-1' placeholder='search' />
                    <a className='border-2 border-l-0 group-hover:border-slate-800 p-1 bg-sky-300 rounded-r'>search</a>
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

export async function getStaticProps({ params }: GetStaticPropsContext<SearchParams>) {

    const data = await (await fetch(`http://localhost:3000/api/getBooks?search=${params?.search}`)).json()

    return {
        props: {
            data
        }
    }
}

export async function getStaticPaths() {

    const key = process.env.BOOK_API_KEY
    // const data = await (await (fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}`))).json()

    return {
        paths: [{ params: { search: 'cat' } }],
        fallback: false,
    }
}