import { NextApiRequest, NextApiResponse } from "next"
import { Item } from "types/types"

export default async function getBookById(req: NextApiRequest, res: NextApiResponse<Item>) {
    try {
        const { id } = req.query
        const data = await (await (fetch(`https://www.googleapis.com/books/v1/volumes/${id}`))).json()

        res.json(data)

    } catch(e) {
        console.error(e)
    }
}