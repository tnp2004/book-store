import { NextApiRequest, NextApiResponse } from "next";
import { WithId, Document, ObjectId } from "mongodb";
import clientPromise from "lib/mongodb";

export default async function username(req: NextApiRequest, res: NextApiResponse) {

    const updateUsername = async (username: string, id: string) => {

        try {

            const client = await clientPromise;
            const db = client.db("users");
            const user = await db
                .collection('user_data')
                .updateOne({ _id: new ObjectId(id) }, { $set: { username } })

            if (user) {
                res.json({
                    status: 'ok',
                    message: 'Your username has been updated'
                })
            }

        } catch (e) {
            console.error(e)
        }
    }

    const validationEditUsername = (editUsername: string, editPassword: string, userData: WithId<Document>) => {
        const usernameValidate = editUsername !== userData.username // check is edit username not same as previous username ?
        const passwordValidate = editPassword === userData.password

        if (!passwordValidate) {
            // invalid email and password
            res.json({
                status: 'error',
                message: 'Your password is invalid'
            })
            
            return
        }

        if (!usernameValidate) {
            // username is same as previous username
            res.json({
                status: 'error',
                message: 'Can not use the same username as previous'
            })

            return
        }


        // validation is clear
        return true
    }

    try {
        const client = await clientPromise;
        const db = client.db("users");
        const { id, username, password } = req.body

        if (username && password) {
            const user = await db
                .collection("user_data")
                .findOne({ _id: new ObjectId(id) })

            if (user) {
                const validateResult = validationEditUsername(username, password, user)

                if (validateResult) {
                    updateUsername(username, id)

                    return
                }
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