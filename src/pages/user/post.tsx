import Layout from 'components/Layout'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

type Props = {}

export default function Post({ }: Props) {

  const { data } = useSession()
  const [ownPosts, setOwnPosts] = useState()

  useEffect(() => {
    const getPost = async () => {
      const ownPosts = await (await fetch('http://localhost:3000/api/post/getOwnPosts', {
        method: 'POST',
        body: JSON.stringify({
          username: data?.user.username
        }),
        headers: {
          Accept: 'application/json, text/plain, */*',
          "Content-Type": "application/json"
        }
      })).json()
      setOwnPosts(ownPosts)
    }
    getPost()
  })

  return (
    <Layout>My posts
      {JSON.stringify(ownPosts)}
    </Layout>
  )
}