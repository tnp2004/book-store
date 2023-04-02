import Layout from 'components/Layout'
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

    return (
        <Layout>your not authenticated</Layout>
    )
}