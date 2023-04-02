import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("http://localhost:3000/api/login", {
                    method: 'POST',
                    body: JSON.stringify({ email: credentials?.email, password: credentials?.password}),
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
}

export default NextAuth(authOptions)