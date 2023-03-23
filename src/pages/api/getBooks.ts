import { NextApiRequest, NextApiResponse } from "next"
import { useRouter } from "next/router"

export default async function getBooks(req: NextApiRequest, res: NextApiResponse) {
    try {
        const key = process.env.BOOK_API_KEY
        const searchDefault = 'cat'
        const { search } = req.query
        const data = await (await (fetch(`https://www.googleapis.com/books/v1/volumes?q=${search ? search : searchDefault}&key=${key}`))).json()

        res.json(data)

    } catch(e) {
        console.error(e)
    }
}