import Layout from 'components/Layout'
import { GetServerSidePropsContext } from 'next/types'
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { BookInformation, ErrorMessage, GenericObject } from 'types/types'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import Nopermission from 'components/Nopermission'

type ObjectBookInfo = GenericObject<BookInformation>

type Props = {
    data: ObjectBookInfo & ErrorMessage
}

export default function Index({ data: { bookData } }: Props) {

    const { data, status } = useSession()
    const [postTitle, setPostTitle] = useState<string>()
    const [comment, setComment] = useState<string>()

    const resetForm = () => {
        setPostTitle('')
        setComment('')
    }

    if (status === 'authenticated') {
        if (bookData) {

            const { title, imageLinks } = bookData
            const defaultBookImage = 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'

            const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault()

                await fetch('http://localhost:3000/api/post/addPost', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: postTitle,
                        comment,
                        owner: data.user.username,
                        bookname: title,
                        image: imageLinks?.thumbnail || defaultBookImage
                    }),
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        "Content-Type": "application/json"
                    }
                })

                resetForm()

            }

            return (
                <Layout>
                    <div className='text-center w-1/3 mx-auto'>
                        <h1 className='text-2xl font-bold my-5 drop-shadow-xl'>New Post</h1>
                        <div>
                            <h2 className='drop-shadow-md'>{title}</h2>
                            <section className='h-56 w-56 my-2 relative mx-auto'>
                                <Image className='mx-auto drop-shadow-xl' priority src={imageLinks?.thumbnail || defaultBookImage} alt={`${title} book`} fill={true} sizes='1' style={{ objectFit: 'contain' }}></Image>
                            </section>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='my-5'>
                                <input className='w-full p-1 drop-shadow-md' type="text" placeholder='Post title' value={postTitle} onChange={e => setPostTitle(e.target.value)} />
                            </div>
                            <textarea className='w-full h-32 p-1 drop-shadow-md' placeholder='comment' value={comment} onChange={e => setComment(e.target.value)}></textarea>
                            <button className='rounded drop-shadow-md bg-gradient-to-r from-emerald-400 to-emerald-500 hover:text-slate-200 p-1 w-full' type='submit'>POST</button>
                        </form>
                    </div>
                </Layout>
            )
        }

        return <Layout>no data</Layout>
    }

    return <Nopermission />

}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const data = await (await fetch(`http://localhost:3000/api/getBookById?id=${params?.id}`)).json()

    return {
        props: {
            data
        }
    }
}