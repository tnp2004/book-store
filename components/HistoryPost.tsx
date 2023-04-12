import React from 'react'
import Image from 'next/image'
import { CommunityPost } from 'types/types'

type Props = {
    post: CommunityPost
}

export default function HistoryPost({ post }: Props) {

    const { title, comment, bookname, image } = post

    return (
        <li className='relative py-2 flex gap-2 border-b-2 first:py-1 last:border-b-0'>
            <small className='absolute top-1 right-2 text-slate-400'>{bookname}</small>
            <div className='relative w-12 h-auto p-5'>
                <Image className='m-auto' priority src={image} fill={true} sizes='1' style={{ objectFit: 'contain' }} alt={`${title} book`} />
            </div>
            <div className='flex-col text-start'>
                <label className='font-bold'>{title}</label>
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg>
                    <p className='text-slate-700 mx-1'>{comment}</p>
                </div>
            </div>
        </li>
    )
}