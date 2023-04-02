import Link from 'next/link'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {}

export default function Navbar({ }: Props) {
    const { data: session } = useSession()
    return (
        <>
            <nav className='flex justify-between p-3 mb-2 border-b-2'>
                <div>
                    <Link href='/' className='font-bold text-slate-800 hover:text-sky-500'>BOOKSTORE</Link>
                </div>
                <div className='flex gap-4 '>
                    <ThemeSwitch />
                    <Link href='/library' className='font-bold text-slate-800 hover:text-sky-500'>library</Link>
                    {session ? (
                        // now login
                        <button onClick={() => signOut()} className='font-bold text-slate-800 hover:text-sky-500'>Logout</button>
                    ) : (
                        // now no login
                        <button onClick={() => signIn()} className='font-bold text-slate-800 hover:text-sky-500'>Login</button>
                    )}

                </div>
            </nav>
        </>
    )
}