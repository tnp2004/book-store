import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getPosts(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("posts");
        const { owner, title } = req.body

        const post = await db
            .collection("post_data")
            .deleteOne({ owner, title})

        res.json(post);
    } catch (e) {
        console.error(e);
    }
};