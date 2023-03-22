import { NextApiRequest, NextApiResponse } from "next"

export default async function getBooks(req: NextApiRequest, res: NextApiResponse) {
    try {
        const key = 'AIzaSyDoZVy32LvDQv9NWvqqmVdrrUfSJslQXxc'
        // console.log(req.query)
        const search = 'cat'
        const data = await (await (fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}`))).json()

        res.json(data)

    } catch(e) {
        console.error(e)
    }
}