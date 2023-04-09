import { NextApiRequest, NextApiResponse } from "next";
import { WithId, Document, ObjectId } from "mongodb";
import clientPromise from "lib/mongodb";

export default async function username(req: NextApiRequest, res: NextApiResponse) {

    const updateUsername = async (username: string, id: string, userData: WithId<Document>) => {

        try {

            const client = await clientPromise;
            const db = client.db("users");
            const user = await db
                .collection('user_data')
                .updateOne({ _id: new ObjectId(id) }, { $set: { username } })

            const postdb = client.db("posts")
            const postUsername = await postdb
                .collection('post_data')
                .updateMany({ owner: userData.username}, { $set: { owner: username }})

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
        const { id, username, password } = req.body

        if (username && password) {
            const user = await (await fetch('http://localhost:3000/api/getUser', {
                method: 'POST',
                body: JSON.stringify({
                    id
                }),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    "Content-Type": "application/json"
                }
            })).json()

            if (user) {
                const validateResult = validationEditUsername(username, password, user)

                if (validateResult) {
                    updateUsername(username, id, user)

                    return
                }
            }

        }

        // no user
        res.json({
            status: 'error',
            message: 'Please fill in all fields'
        })

    } catch (e) {
        res.json({
            status: 'error',
            message: 'Something went wrong'
        })
        console.error(e);
    }
};