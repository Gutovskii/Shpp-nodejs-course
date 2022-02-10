import { RowDataPacket } from "mysql2";

export interface SearchParams {
    offset: string,
    search?: string,
    author?: string,
    year?: string,
}

export interface SqlBooksData {
    booksDataPerPage: RowDataPacket[],
    booksDataLength: number,
    pageQuantity: number
}

export interface NewBookAndAuthorData extends NewBookData, AuthorData {}

export interface NewBookData {
    id: string,
    title: string,
    year: string,
    pages: string,
    description: string
}

export interface AuthorData {
    authorName: string
}

export interface NewError {
    errorNotFound: string
}

export type BookData = Promise<RowDataPacket> | NewError;