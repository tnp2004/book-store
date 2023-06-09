import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addPost(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("posts");
        const { title, comment, owner, bookname, image } = req.body

        const post = await db
            .collection("post_data")
            .insertOne({
                title,
                comment,
                owner,
                bookname,
                image
            })

        res.json(post);
    } catch (e) {
        console.error(e);
    }
};