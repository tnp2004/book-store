import { BookInformation, GenericObject } from 'types/types'
import { GetServerSidePropsContext } from 'next'
import Layout from 'components/Layout'
import Image from 'next/image'
import React from 'react'

type ObjectBookInfo = GenericObject<BookInformation>

type Props = {
    data: ObjectBookInfo
}

export default function BookInfo({ data: { bookData } }: Props) {

    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
    const { title, authors, publisher, description, pageCount, categories, imageLinks, infoLink } = bookData

    return (
        <Layout>
            <div className='flex flex-col xl:flex-row justify-center p-3'>
                <div className='relative w-full h-96 rounded-t-xl xl:w-1/4 xl:h-auto xl:rounded-l-xl xl:rounded-r-none bg-slate-200'>
                    <Image priority src={`${imageLinks?.thumbnail || defaultBookImage}`} alt={title} className='mx-auto p-5' fill={true} sizes='1' style={{ objectFit: 'contain' }} />
                </div>
                <div className='w-full xl:w-2/4 bg-slate-100 py-5 px-4 rounded-b-xl xl:rounded-r-xl xl:rounded-l-none'>
                    <p className='font-bold text-2xl'>{title}</p>
                    <p><label className='font-bold'>Authors:</label> {authors}</p>
                    <p><label className='font-bold'>Publisher:</label> {publisher}</p>
                    <p><label className='font-bold'>Page:</label> {pageCount} pages</p>
                    <p><label className='font-bold'>Categories:</label> {categories}</p>
                    <p><label className='font-bold'>Information:</label> <a href={infoLink}>{infoLink}</a></p>
                    <p>
                        <label className='font-bold' htmlFor="description">Description: </label>
                        <p className='inline' dangerouslySetInnerHTML={{ __html: description }}></p>
                    </p>
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