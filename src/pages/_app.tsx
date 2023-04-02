import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { motion } from 'framer-motion'
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {
  return (
    // PAGE TRANSITIONS EFFECT

    // <motion.div key={router.route} initial="pageInitial" animate="pageAnimate" variants={{
    //   pageInitial: {
    //     opacity: .8
    //   },
    //   pageAnimate: {
    //     opacity: 1
    //   }
    // }}>
    //   <Component {...pageProps} />
    // </motion.div>

    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
