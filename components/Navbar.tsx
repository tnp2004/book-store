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
                    <Link href='/library' className='font-bold text-slate-800 hover:text-emerald-900'>library</Link>
                    {session ? (
                        // now login
                        // <button classNameName='relative group text-slate-800'>
                        //     image

                        //     {/* hamburger menu */}
                        //     <ul classNameName='absolute right-1 top-9 bg-slate-100 px-4 py-2 rounded hidden group-focus:block'>
                        //         <Link classNameName='hover:underline py-1' href='/user/profile'>Profile</Link>
                        //         <li classNameName='hover:underline py-1' onClick={() => signOut()}>Logout</li>
                        //     </ul>
                        // </button>
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