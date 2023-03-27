import React from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'

type Props = {}

export default function index({}: Props) {
  return (
    <Layout>
      <h1 className='text-rose-500 text-3xl'>Homepage</h1>
    </Layout>
  )
} 