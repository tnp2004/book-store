import React from 'react'
import Layout from 'components/Layout'

type Props = {}

export default function Index({ }: Props) {

  return (
    <Layout>
      <div className='h-96 flex text-center p-2'>
        <div className='m-auto'>
          <h1 className='text-slate-900 text-6xl my-32'>Welcome to Bookstore</h1>
          <div>
            <q className='text-xl'>
              <i>A reader lives a thousand lives before he dies, The man who never reads lives only one</i>
            </q>
            <br />
            <b>George R.R. Martin</b>
          </div>
        </div>
      </div>
    </Layout>
  )
} 