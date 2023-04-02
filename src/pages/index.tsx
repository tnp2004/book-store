import React from 'react'
import Layout from 'components/Layout'
import { useSession, signIn, signOut } from "next-auth/react"

type Props = {}

export default function Index({ }: Props) {
  // return (
  //   <Layout>
  //     <h1 className='text-rose-500 text-3xl'>Homepage</h1>
  //   </Layout>
  // )

  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
} 