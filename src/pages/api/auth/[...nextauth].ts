import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions } from "next-auth"
import clientPromise from "lib/mongodb"
import { WithId, Document } from "mongodb"

type UserLogin = {
    email: string,
    password: string
}

type a = {
    id: string
    email: string
    name: string
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
        session: async ({ session }) => {
            const client = await clientPromise;
            const db = client.db("users");
     
            const user = await db
                .collection("user_data")
                .findOne({ email: session.user?.email}) as WithId<Document>
            
            const { _id, email, username } = user

            session.user = { 
                id: _id,
                email,
                username
            }

            return session // The return type will match the one returned in `useSession()`
        },
    },
}

export default NextAuth(authOptions)