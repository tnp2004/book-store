import React from 'react'
import Layout from './Layout'

type Props = {}

export default function Nopermission({ }: Props) {
    return (
        <Layout>
            <div className='flex h-screen'>
                <h1 className='m-auto text-2xl'>You have no permission to access this page</h1>
            </div>
        </Layout>
    )
}