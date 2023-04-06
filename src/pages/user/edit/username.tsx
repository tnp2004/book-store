import Layout from 'components/Layout'
import Nopermission from 'components/Nopermission'
import { useSession } from 'next-auth/react'
import React, { FormEvent, FormEventHandler, useState } from 'react'

type Props = {}

export default function Username({ }: Props) {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const { data, status } = useSession()
    const handleSubmit: FormEventHandler<HTMLElement> = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            await (await fetch('http://localhost:3000/api/edit/username', {
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

            window.location.reload()
        } catch {
            console.error('something wrong')
        }
    }

    if (status === 'authenticated') {
        return (
            <Layout>
                <form onSubmit={handleSubmit} className='border-2 p-4 rounded-md w-2/5 mx-auto my-32 bg-slate-100 drop-shadow-md'>
                    <h1 className='font-bold text-xl text-center'>Username edit</h1>
                    <div className='mt-5'>
                        <section className='flex justify-between py-2'>
                            <label className='text-end font-bold mx-2' htmlFor="new_username">New username</label>
                            <input className='px-1' type="text" value={username} onChange={e => setUsername(e.target.value)} />
                        </section>
                        <section className='flex justify-between py-2'>
                            <label className='text-end font-bold mx-2' htmlFor="password">password</label>
                            <input className='px-1' type="text" value={password} onChange={e => setPassword(e.target.value)} />
                        </section>
                        <button type='submit' className='p-2 font-bold border-2 rounded bg-gradient-to-r from-emerald-400 to-emerald-500'>save changes</button>
                    </div>
                </form>
            </Layout>
        )
    }

    return <Nopermission />
}