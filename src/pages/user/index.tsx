import Layout from 'components/Layout'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import cat_profile from '../../../public/cat_profile.png'
import Image from 'next/image'
import Nopermission from 'components/Nopermission'
import { UserForm } from 'types/types'
import Link from 'next/link'

type Props = {}

export default function Index({ }: Props) {

  const { data, status } = useSession()
  const [user, setUser] = useState<UserForm>()
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = data?.user.id

      const userData = await (await fetch(`http://localhost:3000/api/getUser`, {
        method: 'POST',
        body: JSON.stringify({
          id: userId
        }),
        headers: {
          Accept: 'application/json, text/plain, */*',
          "Content-Type": "application/json"
        }
      })).json()

      setUser(userData)
    }

    fetchUserData()
  })

  useEffect(() => {
    // set form data
    setEmail(user?.email)
    setUsername(user?.username)
    setPassword(user?.password)
  }, [user])

  if (status === 'authenticated') {
    if (user && username && email && password) {
      return (
        <Layout>
          <div className='my-10 mx-auto border-2 w-fit drop-shadow-sm p-5'>
            <h1 className='text-3xl text-center font-bold tracking-widest'>Profile</h1>
            <hr />
            <Image priority src={cat_profile} className='mx-auto w-1/4' alt='profile' />
            <section className='pt-4'>
              <div className='flex justify-between py-2'>
                <label className='w-1/4 font-bold'>Username</label>
                <input className='px-2 mx-5 w-full' type="text" disabled value={username} onChange={e => setUsername(e.target.value)} />
                <Link href='/user/edit/username' className='text-emerald-500 hover:text-emerald-600 rounded px-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </Link>
              </div>
              <hr />
              <div className='flex justify-between py-2'>
                <label className='w-1/4 font-bold'>Email</label>
                <input className='px-2 mx-5 w-full' type="text" disabled value={email} onChange={e => setEmail(e.target.value)} />
                <button disabled className='text-slate-500 rounded px-1 cursor-default'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
              </div>
              <hr />
              <div className='flex justify-between py-2'>
                <label className='w-1/4 font-bold'>Password</label>
                <input className='px-2 mx-5 w-full' type="password" disabled value={password} onChange={e => setPassword(e.target.value)} />
                <Link href='/user/edit/password' className='text-emerald-500 hover:text-emerald-600 rounded px-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </Link>
              </div>
            </section>
          </div>
        </Layout>
      )
    }

    return <Layout>something wrong</Layout>
  }

  return <Nopermission />

}