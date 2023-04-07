import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addPost(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db("posts");
        //    const { email, username, password } = req.body

        const post = await db
            .collection("post_data")
            .insertOne({
                topic: 'Cat lover',
                comment: 'good book',
                owner: 'admin',
                book: 'How to love cat',
                image: 'url image'
            })

        res.json(post);
    } catch (e) {
        console.error(e);
    }
};