import Layout from 'components/Layout'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { CommunityPost } from 'types/types'
import Image from 'next/image'
import Loader from 'components/Loader'
import HistoryPost from 'components/HistoryPost'

type Props = {}

export default function Post({ }: Props) {

  const { data } = useSession()
  const [ownPosts, setOwnPosts] = useState<CommunityPost[]>([])

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

  if (ownPosts && ownPosts.length) {
    return (
      <Layout>
        <div className='mx-auto text-center'>
          <div className='w-1/2 mx-auto p-1 drop-shadow-md bg-slate-100 my-6'>
            <label htmlFor="header" className='font-bold text-2xl'>My posts</label>

            <ul>
              {ownPosts.map((post: CommunityPost, index: number) => (
                <HistoryPost post={post} key={index} />
              ))}
            </ul>
          </div>

        </div>
      </Layout>
    )
  }

  return <Loader />

}