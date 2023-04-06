import Layout from 'components/Layout'
import React from 'react'

type Props = {}

export default function Password({ }: Props) {
    return (
        <Layout>
            <div className='border-2 p-4 rounded-md w-1/4 mx-auto my-32 bg-slate-100 drop-shadow-md'>
                <h1 className='font-bold text-xl text-center'>Password edit</h1>
                <div className='mt-5'>
                    <section className='flex justify-between py-2'>
                        <label className='text-end font-bold mx-2' htmlFor="current_password">Current password</label>
                        <input className='px-1' type="text" />
                    </section>
                    <section className='flex justify-between py-2'>
                        <label className='text-end font-bold mx-2' htmlFor="new_password">New password</label>
                        <input className='px-1' type="text" />
                    </section>
                    <button className='p-2 font-bold border-2 rounded bg-gradient-to-r from-emerald-400 to-emerald-500'>save changes</button>
                </div>
            </div>
        </Layout>
    )
}