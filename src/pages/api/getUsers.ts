import clientPromise from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUsers (req: NextApiRequest, res: NextApiResponse) {
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
};