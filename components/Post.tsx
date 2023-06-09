import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CommunityPost } from 'types/types'

type Props = {
    post: CommunityPost
}

export default function Post({ post }: Props) {
    return (
        <div className='flex gap-1 pr-2 py-3 my-5 h-32 rounded drop-shadow-md bg-slate-50'>
            {/* image */}
            <section className='relative w-1/4 p-1'>
                <Image className='m-auto' priority src={post.image} fill={true} sizes='1' style={{ objectFit: 'contain' }} alt={`${post.title} book`} />
            </section>

            <section className='flex flex-col justify-between w-full'>
                <div className='flex justify-between'>
                    <label htmlFor="headder" className='font-bold'>{post.title}</label>
                    <small className='text-slate-400'>{post.bookname}</small>
                </div>
                <p>{post.comment}</p>
                <div className='text-end'>
                    <Link href={`/user/${post.owner}`} className='text-slate-900 cursor-pointer hover:underline'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>

                        {post.owner}
                    </Link>
                </div>
            </section>
        </div>
    )
}