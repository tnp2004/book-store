import Layout from 'components/Layout'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import cat_profile from '../../../public/cat_profile.png'
import Image from 'next/image'
import Nopermission from 'components/Nopermission'
import Link from 'next/link'

type Props = {}

export default function Profile({ }: Props) {

  const { data, status } = useSession()
  const [user, setUser] = useState()
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
    setEmail(user?.email)
    setUsername(user?.username)
    setPassword(user?.password)

  })

  if (status === 'authenticated') {
    return (
      <Layout>
        <div className='relative my-10 mx-auto border-2 w-fit drop-shadow-sm p-5'>
          <h1 className='text-3xl text-center font-bold'>Profile</h1>
          <hr />
          <Image src={cat_profile} className='mx-auto w-1/4' alt='profile' />
          <Link href='/user/edit/profile' className='absolute top-3 right-3 p-1 bg-emerald-400 hover:bg-emerald-500 rounded-md drop-shadow-sm'>Edit profile</Link>
          <section className='pt-4'>
            <div className='flex justify-between py-2'>
              <label className='w-1/4 font-bold'>Username</label>
              <input className='px-2 mx-5 w-full' type="text" disabled  onChange={(e) => setUsername(e.target.value)} value={username} />
              <button className='bg-slate-300 px-1'>edit</button>
            </div>
            <hr />
            <div className='flex justify-between py-2'>
              <label className='w-1/4 font-bold'>Email</label>
              <input className='px-2 mx-5 w-full' type="text" disabled onChange={(e) => setEmail(e.target.value)} value={email} />
              <button className='bg-slate-300 px-1'>edit</button>
            </div>
            <hr />
            <div className='flex justify-between py-2'>
              <label className='w-1/4 font-bold'>Password</label>
              <input className='px-2 mx-5 w-full' type="password" disabled onChange={(e) => setPassword(e.target.value)} value={password} />
              <button className='bg-slate-300 px-1'>edit</button>
            </div>
          </section>
        </div>
      </Layout>
    )
  }

  return <Nopermission />

}