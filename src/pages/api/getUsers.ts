import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "./auth/[...nextauth]"

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {

    // comment code is code for protect api route
    // const session = await getServerSession(req, res, authOptions)

    // if (session) {
        try {
            const client = await clientPromise;
            const db = client.db("users");

            const users = await db
                .collection("user_data")
                .find({})
                .toArray()

            res.json(users);
        } catch (e) {
            console.error(e);
        }
    // } else {
    //     res.status(401).json({ error: 'You have no permission' })
    // }

};