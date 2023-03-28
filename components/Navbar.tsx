import Link from 'next/link'
import React from 'react'

type Props = {}

export default function Navbar({ }: Props) {
    return (
        <>
            <nav className='flex justify-between p-3 mb-2 border-b-2'>
                <div>
                    <Link href='/' className='font-bold text-slate-800 hover:text-sky-500'>home</Link>
                </div>
                <div className='flex gap-4 '>
                    <Link href='/library' className='font-bold text-slate-800 hover:text-sky-500'>library</Link>
                    <Link href='/login' className='font-bold text-slate-800 hover:text-sky-500'>Login</Link>
                </div>
            </nav>
        </>
    )
}