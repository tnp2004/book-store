import Layout from 'components/Layout'
import React from 'react'
import Image from 'next/image'
import { Post } from 'types/types'

type Props = {
    data: Post[]
}

export default function community({ data }: Props) {

    return (
        <Layout>
            <div className='w-2/3 mx-auto'>
                <h1 className='text-2xl font-bold text-center my-5'>Community</h1>

                {data.map((post: Post, index: number) => (
                    <div className='flex gap-1 pr-2 py-3 my-5 h-32 rounded drop-shadow-md bg-slate-50' key={index}>
                        <section className='relative flex w-1/4'>
                            <Image className='m-auto' priority src={post.image} fill={true} sizes='1' style={{ objectFit: 'contain' }} alt={`${post.title} book`} />
                        </section>
                        <section className='flex flex-col justify-between w-full'>
                            <label htmlFor="headder" className='font-bold'>{post.title}</label>
                            <p>{post.comment}</p>
                            <small className='text-end'>{post.owner}</small>
                        </section>
                    </div>
                ))}

            </div>
        </Layout>
    )
}

export async function getServerSideProps() {
    const data = await (await fetch('http://localhost:3000/api/post/getPosts')).json()

    return {
        props: {
            data
        }
    }
}