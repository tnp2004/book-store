import clientPromise from "lib";
import { NextApiRequest, NextApiResponse } from "next";

export default async function test (req: NextApiRequest, res: NextApiResponse) {
   try {
       const client = await clientPromise;
       const db = client.db("users");

       const movies = await db
           .collection("user_data")
           .insertOne({name: 'ice', age: 18})

       res.json(movies);
   } catch (e) {
       console.error(e);
   }
};