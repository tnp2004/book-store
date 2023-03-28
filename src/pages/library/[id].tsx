import Layout from 'components/Layout'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { BookInformation, GenericObject } from 'types/types'
import Image from 'next/image'

type ObjectBookInfo = GenericObject<BookInformation>

type Props = {
    data: ObjectBookInfo
}

export default function BookInfo({ data: { bookData } }: Props) {

    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
    const { title, authors, publisher, description, pageCount, categories, imageLinks, infoLink } = bookData

    return (
        <Layout>
            <div className='flex flex-col lg:flex-row justify-center p-3'>
                <div className='relative w-full h-96 rounded-t-xl lg:w-1/4 lg:h-auto lg:rounded-l-xl lg:rounded-r-none bg-slate-200'>
                    <Image priority src={`${imageLinks?.thumbnail || defaultBookImage}`} alt={title} className='mx-auto p-5' fill={true} sizes='1' style={{ objectFit: 'contain' }} />
                </div>
                <div className='w-full lg:w-2/4 bg-slate-100 py-5 px-4 rounded-b-xl lg:rounded-r-xl lg:rounded-l-none'>
                    <p className='font-bold text-rose-600'>{title}</p>
                    <p>authors: {authors}</p>
                    <p>publisher: {publisher}</p>
                    <p>pageCount: {pageCount}</p>
                    <p>categories: {categories}</p>
                    <a href={infoLink}>infoLink: {infoLink}</a>
                    <p dangerouslySetInnerHTML={{ __html: description }}></p>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const data = await (await fetch(`http://localhost:3000/api/getBookById?id=${params?.id}`)).json()

    return {
        props: {
            data
        }
    }
}