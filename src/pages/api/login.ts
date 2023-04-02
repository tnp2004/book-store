import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";

interface Userdata {
    _id: ObjectId
    email: string
    username: string
    password: string
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {

    const validationLogin = (loginEmail: string, loginPassword: string, userData: Userdata) => {
        const emailValidate = loginEmail === userData.email
        const passwordValidate = loginPassword === userData.password

        if (emailValidate && passwordValidate) {
            res.json({
                status: 'ok',
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

        const user = await db
            .collection("user_data")
            .findOne({ email })

        if (user) {
            validationLogin(email, password, user)
            return
        }

        // no user
        res.json({
            status: 'user not found'
        })
    } catch (e) {
        res.json({
            status: 'Something went wrong'
        })
        console.error(e);
    }
};