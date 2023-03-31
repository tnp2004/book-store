import Loading from '../components/Loading'
import Navbar from './Navbar'
import Head from 'next/head'

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