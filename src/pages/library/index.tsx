import Layout from 'components/Layout'
import React, { useState } from 'react'
import { BooksObj, Item } from 'types/types'

type Props = {
    data: BooksObj
}

export default function Index({ data }: Props) {

    const [booksData, setBooksData] = useState<Item[]>(data.items)

    return (
        <Layout>
            <h1 className='text-rose-500 text-3xl'>Library page</h1>
            {/* {JSON.stringify(data)} */}
            <ul>
                {booksData.map((val: Item, index: number) => (
                    <li key={index}>{val.volumeInfo.title}</li>
                ))}
            </ul>
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