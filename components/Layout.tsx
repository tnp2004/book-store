import Link from 'next/link'
import React from 'react'

type Props = {}

// this file is for Navbar
export default function Layout(props: any) {
    return (
        <>
            <nav className='bg-sky-300 p-3 flex gap-3'>
                <Link href='/' className='font-bold text-slate-800 hover:text-blue-700'>home</Link>
                <Link href='/library' className='font-bold text-slate-800 hover:text-blue-700'>library</Link>
            </nav>
                {props.children}
        </>
    )
}