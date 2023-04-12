import Layout from 'components/Layout'
import React from 'react'
import Post from 'components/Post'
import { CommunityPost } from 'types/types'

type Props = {
    data: CommunityPost[]
}

export default function community({ data }: Props) {

    return (
        <Layout>
            <div className='md:w-2/3 mx-auto p-1'>
                <h1 className='text-2xl font-bold text-center my-5'>Community</h1>

                <div className='lg:w-2/3 mx-auto'>
                    {data.map((post: CommunityPost, index: number) => (
                        <Post post={post} key={index} />
                    ))}
                </div>

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