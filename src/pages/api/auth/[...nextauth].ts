import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"

type UserLogin = {
    email: string,
    password: string
}

export const authOptions: NextAuthOptions = {

    providers: [
        CredentialsProvider({
            name: 'Credentials',
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as UserLogin
                const res = await fetch("http://localhost:3000/api/login", {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
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
    },
    callbacks: {
        session({ session }) {
            return session // The return type will match the one returned in `useSession()`
        },
    },
}

export default NextAuth(authOptions)