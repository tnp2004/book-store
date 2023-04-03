import React from 'react'
import Layout from 'components/Layout'
import { useSession } from 'next-auth/react'

type Props = {}

export default function Index({ }: Props) {

  const { data } = useSession()

  return (
    <Layout>
      <h1 className='text-rose-500 text-3xl'>Homepage</h1>
      { data && <h2>welcome {data.user?.email}</h2>}
    </Layout>
  )
} 