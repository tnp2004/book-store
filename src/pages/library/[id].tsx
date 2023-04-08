import { BookInformation, GenericObject, ErrorMessage } from 'types/types'
import { GetServerSidePropsContext } from 'next'
import Layout from 'components/Layout'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

type ObjectBookInfo = GenericObject<BookInformation>

type Props = {
    data: ObjectBookInfo & ErrorMessage
}

export default function BookInfo({ data }: Props) {

    const { bookData } = data
    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
    const router = useRouter()
    const { id } = router.query

    if (bookData) {
        const { title, authors, publisher, description, pageCount, categories, imageLinks, infoLink } = bookData

        return (
            <Layout>
                <div className='flex flex-col xl:flex-row justify-center p-3 drop-shadow-md'>
                    <div className='relative w-full h-96 rounded-t-xl xl:w-1/4 xl:h-auto xl:rounded-l-xl xl:rounded-r-none bg-slate-200'>
                        <Image priority src={`${imageLinks?.thumbnail || defaultBookImage}`} alt={title} className='mx-auto p-5' fill={true} sizes='1' style={{ objectFit: 'contain' }} />
                    </div>
                    <div className='relative w-full xl:w-2/4 bg-slate-100 py-5 px-4 rounded-b-xl xl:rounded-r-xl xl:rounded-l-none'>
                        <Link className='absolute top-2 right-4 px-1 hover:text-emerald-600 drop-shadow-sm' href={`/post/${id}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>

                        </Link>
                        <section className='font-bold text-2xl text-slate-900 my-3'>{title}</section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Authors: </label> {authors}
                        </section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Publisher: </label>
                            {publisher}
                        </section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Page: </label>
                            {pageCount} pages
                        </section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Categories: </label>
                            {categories}
                        </section>
                        <section className='text-blue-800'>
                            <label className='font-bold text-slate-900'>Information: </label>
                            <a className='underline' href={infoLink}>{infoLink}</a>
                        </section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900' htmlFor="description">Description: </label>
                            <div className='inline' dangerouslySetInnerHTML={{ __html: description }}></div>
                        </section>
                    </div>
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

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const data = await (await fetch(`http://localhost:3000/api/getBookById?id=${params?.id}`)).json()

    return {
        props: {
            data
        }
    }
}