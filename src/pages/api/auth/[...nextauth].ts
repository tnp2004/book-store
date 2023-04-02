import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
   
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string,
                    password: string
                }
                const res = await fetch("http://localhost:3000/api/login", {
                    method: 'POST',
                    body: JSON.stringify({ email: email, password: password }),
                    headers: { "Content-Type": "application/json" }
                })
                const data = await res.json()

                if (data.status === 'ok') {
                    return data.user
                }
                

                return null
            }
        })
    ],
    pages: {
        signIn: '/login'
    }
}

export default NextAuth(authOptions)