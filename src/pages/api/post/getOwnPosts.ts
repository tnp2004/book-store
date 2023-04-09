import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getOwnPosts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("posts");
        const { username } = req.body

        const posts = await db
            .collection("post_data")
            .find({ owner: username })
            .toArray()


        if (posts.length !== 0) {
            res.json(posts)
            return
        } 

        res.json({
            status: 'error',
            message: 'Posts not found'
        });

    } catch (e) {
         res.json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};