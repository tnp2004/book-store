import { NextApiRequest, NextApiResponse } from "next";
import { WithId, Document, ObjectId } from "mongodb";
import clientPromise from "lib/mongodb";

export default async function password(req: NextApiRequest, res: NextApiResponse) {

    const updatePassword = async (password: string, id: string) => {

        try {

            const client = await clientPromise;
            const db = client.db("users");
            const user = await db
                .collection('user_data')
                .updateOne({ _id: new ObjectId(id) }, { $set: { password } })

            if (user) {
                res.json({
                    status: 'ok',
                    message: 'Your password has been updated'
                })
            }

        } catch (e) {
            console.error(e)
        }
    }

    const validationEditPassword = (currentPassword: string, editPassword: string, userData: WithId<Document>) => {
        const passwordIsNotSame = currentPassword !== editPassword // check Is current password is not same as previous password ?
        const passwordValidate = currentPassword === userData.password

        if (!passwordIsNotSame) {
            // password is same as previous password
            res.json({
                status: 'error',
                message: 'Can not use the same password as previous'
            })

            return
        }
        if (!passwordValidate) {
            // invalid email and password
            res.json({
                status: 'error',
                message: 'Your current password is invalid'
            })

            return
        }

        // validation is clear
        return true
    }

    try {
        const client = await clientPromise;
        const db = client.db("users");
        const { id, currentPassword, newPassword } = req.body

        if (currentPassword && newPassword) {
            const user = await db
                .collection("user_data")
                .findOne({ _id: new ObjectId(id) })

            if (user) {
                const validateResult = validationEditPassword(currentPassword, newPassword, user)

                if (validateResult) {
                    updatePassword(newPassword, id)

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