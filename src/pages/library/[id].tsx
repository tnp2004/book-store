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

    const router = useRouter()
    const { id } = router.query

    const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'
    const { title, authors, publisher, description, pageCount, categories, imageLinks, infoLink } = bookData

    return (
        <Layout>
            <h1>This is Book information page </h1>
            <h3>id: {id}</h3>
            <div className='relative p-1 w-48 h-48 my-2'>
                <Image priority src={`${imageLinks?.smallThumbnail || defaultBookImage}`} alt={title} className='mx-auto' fill={true} sizes='1' style={{ objectFit: 'contain' }} />
            </div>
            <p className='font-bold text-rose-600'>{title}</p>
            <p>authors: {authors}</p>
            <p>publisher: {publisher}</p>
            <p>pageCount: {pageCount}</p>
            <p>categories: {categories}</p>
            <a href={infoLink}>infoLink: {infoLink}</a>
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
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