import { NextApiRequest, NextApiResponse } from "next"
import { Item, PreviewBook } from "types/types"

export default async function getBooks(req: NextApiRequest, res: NextApiResponse) {
    try {
        const key = process.env.BOOK_API_KEY
        const { search } = req.query
        const data = await (await (fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}`))).json()

        const filterBooksData = await data.items.map((book: Item): PreviewBook => {
            const { id } = book
            const { title, authors, imageLinks } = book.volumeInfo
            const filteredData = new Object({
                id,
                title,
                authors,
                imageLinks
            }) as PreviewBook

            return filteredData
        })

        const jsonData = await new Object({
            booksData: filterBooksData
        })

        res.json(jsonData)

    } catch (e) {
        console.error(e)
        res.status(500).json('Oops! error has occurred')
    }
}