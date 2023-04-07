import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import React from 'react'
import Dropdowns from "./Dropdowns"

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
                    <Link href='/library' className='font-bold text-slate-800 hover:text-emerald-900'>Library</Link>
                    <Link href='/community' className='font-bold text-slate-800 hover:text-emerald-900'>Community</Link>

                    {session ? (
                        // now login
                       <Dropdowns />

                    ) : (
                        // now no login
                        <button onClick={() => signIn()} className='font-bold text-slate-800 hover:text-emerald-900'>Login</button>
                    )}

                </div>
            </nav>
        </>
    )
}