import { ObjectId, WithId } from "mongodb"
import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: UserForm 
  }
}

export interface Post {
    title: string
    comment: string
    owner: string
    bookname: string
    image: string
}

export interface alert {
    status: 'ok' | 'error'
    message: string
}

export interface UserForm {
    id: ObjectId
    email: string
    username: string
    password?: string
}

export interface GenericObject<T> {
    [key: string]: T
}

export interface ErrorMessage {
    errorMessage: string
}

export interface BookInformation {
    title: string
    authors: string
    publisher: string
    description: string
    pageCount: number
    categories: string[]
    imageLinks?: Thumbnail
    infoLink: string
}
export interface PreviewBook {
    id: string
    title: string
    authors: string[]
    imageLinks?: Thumbnail
}

interface Thumbnail {
    [key: string]: string
}

export interface BooksObj {
    kind: string
    totalItems: number
    items: Item[]
}

export interface Item {
    kind: string
    id: string
    etag: string
    selfLink: string
    volumeInfo: VolumeInfo
    saleInfo: SaleInfo
    accessInfo: AccessInfo
    searchInfo?: SearchInfo
}

export interface VolumeInfo {
    title: string
    authors: string[]
    publisher?: string
    publishedDate: string
    description?: string
    industryIdentifiers: IndustryIdentifier[]
    readingModes: ReadingModes
    pageCount: number
    printType: string
    categories?: string[]
    averageRating?: number
    ratingsCount?: number
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    panelizationSummary: PanelizationSummary
    imageLinks: ImageLinks
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
    subtitle?: string
}

export interface IndustryIdentifier {
    type: string
    identifier: string
}

export interface ReadingModes {
    text: boolean
    image: boolean
}

export interface PanelizationSummary {
    containsEpubBubbles: boolean
    containsImageBubbles: boolean
}

export interface ImageLinks {
    smallThumbnail: string
    thumbnail: string
}

export interface SaleInfo {
    country: string
    saleability: string
    isEbook: boolean
    listPrice?: ListPrice
    retailPrice?: RetailPrice
    buyLink?: string
    offers?: Offer[]
}

export interface ListPrice {
    amount: number
    currencyCode: string
}

export interface RetailPrice {
    amount: number
    currencyCode: string
}

export interface Offer {
    finskyOfferType: number
    listPrice: ListPrice2
    retailPrice: RetailPrice2
}

export interface ListPrice2 {
    amountInMicros: number
    currencyCode: string
}

export interface RetailPrice2 {
    amountInMicros: number
    currencyCode: string
}

export interface AccessInfo {
    country: string
    viewability: string
    embeddable: boolean
    publicDomain: boolean
    textToSpeechPermission: string
    epub: Epub
    pdf: Pdf
    webReaderLink: string
    accessViewStatus: string
    quoteSharingAllowed: boolean
}

export interface Epub {
    isAvailable: boolean
    acsTokenLink?: string
}

export interface Pdf {
    isAvailable: boolean
    acsTokenLink?: string
}

export interface SearchInfo {
    textSnippet: string
}
