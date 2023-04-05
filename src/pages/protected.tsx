import Layout from 'components/Layout'
import Nopermission from 'components/Nopermission'
import { useSession } from 'next-auth/react'
import React from 'react'

type Props = {}

// sample protected page
export default function Protected({ }: Props) {
    const { status } = useSession()

    if (status === 'authenticated') {
        return (
            <Layout>protected page</Layout>
        )
    }

    return  <Nopermission />
}