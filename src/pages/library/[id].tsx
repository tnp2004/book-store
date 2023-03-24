import Layout from 'components/Layout'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { Item } from 'types/types'

type Props = {
    data: Item
}

export default function BookInfo({ data }: Props) {

    const router = useRouter()
    const { id } = router.query

  return (
    <Layout>
        <h1>This is Book information page </h1>
        <h3>id: {id}</h3>
        <p className='font-bold text-rose-600'>{data.volumeInfo.title}</p>
    </Layout>
  )
}

export async function getServerSideProps({ params }: GetServerSidePropsContext) {
    const data = await (await fetch(`http://localhost:3000/api/getBookById?id=${params?.id}`)).json()

    return {
        props: {
            data
        }
    }
}