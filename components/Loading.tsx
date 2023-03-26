import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {}

// loading for move page to page
// not effective with child of main page(look at pathname)
export default function Loading({}: Props): any {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const handleStart = (url: string) => (url !== router.asPath) && setLoading(true)
        const handleComplete = (url: string) => (url === router.asPath) && setLoading(false)

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })

    return loading && (
        <div>loading...</div>
    )

}