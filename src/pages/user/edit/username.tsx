import Layout from 'components/Layout'
import Nopermission from 'components/Nopermission'
import { useSession } from 'next-auth/react'
import React, { FormEvent, FormEventHandler, useState } from 'react'
import { alert } from 'types/types'

type Props = {}

export default function Username({ }: Props) {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [alertData, setAlertData] = useState<alert>()

    const { data, status } = useSession()
    const handleSubmit: FormEventHandler<HTMLElement> = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const responseData = await (await fetch('http://localhost:3000/api/edit/username', {
                method: 'POST',
                body: JSON.stringify({
                    id: data?.user.id,
                    username,
                    password
                }),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    "Content-Type": "application/json"
                }
            })).json()

            setAlertData(responseData)
        } catch {
            console.error('Something went wrong')
        }
    }

    if (status === 'authenticated') {
        return (
            <Layout>
                <form onSubmit={handleSubmit} className='border-2 p-4 rounded-md w-4/5 lg:w-2/5 mx-auto my-32 bg-slate-100 drop-shadow-md'>
                    <h1 className='font-bold text-xl text-center'>Username edit</h1>
                    <div className='mt-5'>
                        <section className='py-2'>
                            <label className='text-end font-bold' htmlFor="new_username">New username</label>
                            <input className='w-full' type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </section>
                        <section className='py-2'>
                            <label className='text-end font-bold' htmlFor="password">Password</label>
                            <input className='w-full' type="text" value={password} onChange={e => setPassword(e.target.value)} />
                        </section>
                        <div className='flex justify-between'>
                            <small className={`my-auto font-bold ${alertData?.status}`}>{alertData?.message}</small>
                            <button type='submit' className='px-2 py-1 rounded hover:text-white bg-gradient-to-r from-emerald-400 to-emerald-500'>save changes</button>
                        </div>
                    </div>
                </form>
            </Layout>
        )
    }

    return <Nopermission />
}