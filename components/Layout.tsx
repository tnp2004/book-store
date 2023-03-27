import Link from 'next/link'
import Loading from '../components/Loading'
import Head from 'next/head'

type Props = {}

// this file is for Navbar
export default function Layout(props: any) {
    return (
        <>
            <Head>
                <title>Book Store</title>
            </Head>
            <Loading />
            <nav className='bg-sky-300 p-3 flex gap-3'>
                <Link href='/' className='font-bold text-slate-800 hover:text-blue-700'>home</Link>
                <Link href='/library' className='font-bold text-slate-800 hover:text-blue-700'>library</Link>
            </nav>
            {props.children}
        </>
    )
}