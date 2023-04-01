import clientPromise from "lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getUsers (req: NextApiRequest, res: NextApiResponse) {
   try {
       const client = await clientPromise;
       const db = client.db("users");
       const { id } = req.body

       const user = await db
           .collection("user_data")
           .findOne({ _id: new ObjectId(id)})

       res.json(user);
   } catch (e) {
       console.error(e);
   }
};