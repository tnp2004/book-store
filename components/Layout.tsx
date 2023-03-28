import Loading from '../components/Loading'
import Head from 'next/head'
import Navbar from './Navbar'

// this file is for Navbar
export default function Layout(props: any) {
    return (
        <>
            <Head>
                <title>Book Store</title>
            </Head>
            <Loading />
            <Navbar />
            {props.children}
        </>
    )
}