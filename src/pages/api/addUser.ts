import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function addUser (req: NextApiRequest, res: NextApiResponse) {
   try {
       const client = await clientPromise;
       const db = client.db("users");
       const { name, age } = req.body

       const user = await db
           .collection("user_data")
           .insertOne({ name, age })

       res.json(user);
   } catch (e) {
       console.error(e);
   }
};