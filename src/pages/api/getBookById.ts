import { NextApiRequest, NextApiResponse } from "next"

export default async function getBookById(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { id } = req.query
        const bookData = await (await (fetch(`https://www.googleapis.com/books/v1/volumes/${id}`))).json()

        const { title, authors, publisher, description, pageCount, categories, imageLinks, infoLink } = bookData.volumeInfo
        const filterBookData = new Object({
            title, 
            authors,
            publisher,
            description,
            pageCount,
            categories,
            imageLinks,
            infoLink
        })

        const jsonData = await new Object({
            bookData: filterBookData
        })

        res.json(jsonData)

    } catch(e) {
        console.error(e)
        res.status(500).json('Oops! error has occurred')
    }
}