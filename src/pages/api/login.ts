import { NextApiRequest, NextApiResponse } from "next";
import { WithId, Document } from "mongodb";
import clientPromise from "lib/mongodb";

export default async function login(req: NextApiRequest, res: NextApiResponse) {

    const validationLogin = (loginEmail: string, loginPassword: string, userData: WithId<Document>) => {
        const emailValidate = loginEmail === userData.email
        const passwordValidate = loginPassword === userData.password

        if (emailValidate && passwordValidate) {
            res.json({
                status: 'ok',
                message: 'Logged in',
                user: userData
            })

            return
        }

        // invalid email and password
        res.json({
            status: 'error',
            message: 'Login failed'
        })
    }

    try {
        const client = await clientPromise;
        const db = client.db("users");
        const { email, password } = req.body

        if (email && password) {
            const user = await db
                .collection("user_data")
                .findOne({ email })
                
            if (user) {
                validationLogin(email, password, user)
                return
            }
        }


        // no user
        res.json({
            status: 'error',
            message: 'invalid data'
        })
    } catch (e) {
        res.json({
            status: 'error',
            message: 'something went wrong'
        })
        console.error(e);
    }
};