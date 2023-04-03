import Link from 'next/link'
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {}

export default function Navbar({ }: Props) {
    const { data: session } = useSession()
    return (
        <>
            <nav className='flex justify-between p-3 mb-2 border-b-2 border-emerald-800/50 bg-emerald-600 drop-shadow-md sticky top-0 z-10'>
                <div>
                    <Link href='/' className='font-bold text-slate-800 hover:text-emerald-900'>BOOKSTORE</Link>
                </div>
                <div className='flex gap-4 '>
                    <Link href='/library' className='font-bold text-slate-800 hover:text-emerald-900'>library</Link>
                    {session ? (
                        // now login
                        <button className='relative group text-slate-800'>
                            image
                            <div className='absolute right-2 top-8 bg-slate-100 w-5 h-5 rotate-45 rounded hidden group-focus:block'></div>
                            <ul className='absolute right-1 top-9 bg-slate-100 p-2 rounded hidden group-focus:block'>
                                <li onClick={() => signOut()}>Logout</li>
                            </ul>
                        </button>
                    ) : (
                        // now no login
                        <button onClick={() => signIn()} className='font-bold text-slate-800 hover:text-sky-500'>Login</button>
                    )}

                </div>
            </nav>
        </>
    )
}