import Layout from 'components/Layout'
import { GetServerSidePropsContext } from 'next/types'
import React, { FormEvent, FormEventHandler } from 'react'
import { BookInformation, ErrorMessage, GenericObject } from 'types/types'
import Image from 'next/image'

type ObjectBookInfo = GenericObject<BookInformation>

type Props = {
    data: ObjectBookInfo & ErrorMessage
}

export default function Index({ data: { bookData } }: Props) {

    if (bookData) {

        const { title, imageLinks } = bookData
        const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'

        const handleSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent<HTMLFormElement>) => {
            
        }
        
        return (
            <Layout>
                <div className='text-center w-1/3 mx-auto'>
                    <h1 className='text-2xl font-bold my-5'>New Post</h1>
                    <div>
                        <h2 className=''>{title}</h2>
                        <section className='w-32 h-32 relative mx-auto'>
                            <Image className='mx-auto' priority src={imageLinks?.thumbnail || defaultBookImage} alt={`${title} book`} fill={true} sizes='1' style={{ objectFit: 'contain' }}></Image>
                        </section>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='my-5'>
                            <input className='w-full' type="text" placeholder='topic' />
                        </div>
                        <textarea className='w-full h-32'></textarea>
                        <button type='submit'>POST</button>
                    </form>
                </div>
            </Layout>
        )
    }

    return <Layout>no data</Layout>
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const data = await (await fetch(`http://localhost:3000/api/getBookById?id=${params?.id}`)).json()

    return {
        props: {
            data
        }
    }
}