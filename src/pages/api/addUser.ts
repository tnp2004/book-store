import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addUser (req: NextApiRequest, res: NextApiResponse) {
   try {
       const client = await clientPromise;
       const db = client.db("users");
       const { email, username, password } = req.body

       const user = await db
           .collection("user_data")
           .insertOne({ email, username, password })

       res.json(user);
   } catch (e) {
       console.error(e);
   }
};