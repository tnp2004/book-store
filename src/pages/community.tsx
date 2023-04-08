import Layout from 'components/Layout'
import React from 'react'
import Image from 'next/image'

type Props = {}

export default function community({ }: Props) {
    return (
        <Layout>
            <div className='w-2/3 mx-auto'>
                <h1 className='text-2xl font-bold text-center my-5'>Community</h1>

                <div className='flex gap-1 pr-2 py-3 h-32 rounded drop-shadow-md bg-slate-50'>
                    <section className='flex w-1/4'>
                        <Image className='m-auto' priority src='https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80' width={100} height={100} alt={''} />
                    </section>
                    <section className='flex flex-col justify-between w-full'>
                        <label htmlFor="headder" className='font-bold'>topic</label>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, natus voluptatem. Excepturi suscipit ipsum impedit ratione. Magni ab provident aliquam!</p>
                        <small className='text-end'>username</small>
                    </section>
                </div>
            </div>
        </Layout>
    )
}