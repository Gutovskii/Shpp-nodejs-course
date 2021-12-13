import fs from 'fs'
import crypto from 'crypto'
import { IUser, IDb } from '../interfaces/db'

const dbUsers: string = './db/db.json'

export const loginService = (login: string, pass: string): string | undefined => {
    const database: IDb = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'))
    const user: IUser | undefined = database.users.find((userData: IUser) => userData.login === login && userData.pass === pass)
    if (!user) return undefined
    return user._id
}

export const registerService = (login: string, pass: string): string | undefined => {
    const database: IDb = JSON.parse(fs.readFileSync(dbUsers, 'utf-8'))
    const user: IUser | undefined = database.users.find((userData: IUser) => userData.login === login)
    if (user) {
        return undefined
    }
    const newUser: IUser = {
        _id: crypto.randomBytes(16).toString('hex'),
        login,
        pass,
        tasks: []
    }
    database.users.push(newUser)
    fs.writeFileSync(dbUsers, JSON.stringify(database, null, '\t'))

    return newUser._id
}