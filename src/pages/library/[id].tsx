import { BookInformation, GenericObject, ErrorMessage } from 'types/types'
import { GetServerSidePropsContext } from 'next'
import Layout from 'components/Layout'
import Image from 'next/image'
import React from 'react'

type ObjectBookInfo = GenericObject<BookInformation>

type Props = {
    data: ObjectBookInfo & ErrorMessage
}

export default function BookInfo({ data }: Props) {

    const { bookData } = data
    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'

    if (bookData) {
        const { title, authors, publisher, description, pageCount, categories, imageLinks, infoLink } = bookData

        return (
            <Layout>
                <div className='flex flex-col xl:flex-row justify-center p-3 drop-shadow-md'>
                    <div className='relative w-full h-96 rounded-t-xl xl:w-1/4 xl:h-auto xl:rounded-l-xl xl:rounded-r-none bg-slate-200'>
                        <Image priority src={`${imageLinks?.thumbnail || defaultBookImage}`} alt={title} className='mx-auto p-5' fill={true} sizes='1' style={{ objectFit: 'contain' }} />
                    </div>
                    <div className='w-full xl:w-2/4 bg-slate-100 py-5 px-4 rounded-b-xl xl:rounded-r-xl xl:rounded-l-none'>
                        <section className='font-bold text-2xl text-slate-900 my-3'>{title}</section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Authors: </label> {authors}
                        </section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Publisher: </label>
                            {publisher}</section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Page: </label>
                            {pageCount} pages</section>
                        <section className='text-slate-700'>
                            <label className='font-bold text-slate-900'>Categories: </label>
                            {categories}</section>
                        <section className='text-blue-800'>
                            <label className='font-bold text-slate-900'>Information: </label>
                            <a className='underline' href={infoLink}>{infoLink}</a></section>
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