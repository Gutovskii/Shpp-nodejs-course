import crypto from 'crypto'
import { RowDataPacket } from 'mysql2'
import db from "../db/connect"
import { IUser, findUserNameData, loginUserData, newUserData } from "../interfaces/environment"

export const loginService = async (userData: IUser): Promise<RowDataPacket[] | undefined> => {
    const sql = `SELECT * FROM users WHERE login = ? AND pass = ?`
    const loginUserData: loginUserData = [userData.login, userData.pass]
    const [user] = await db.query<RowDataPacket[]>(sql, loginUserData)
    if (!user.length) return undefined
    return user
}

export const registerService = async (userData: IUser): Promise<RowDataPacket[] | undefined> => {
    const sqlGetUser = `SELECT * FROM users WHERE login = ?`
    const findUserNameData: findUserNameData = [userData.login]
    const [rowsGetUser]: any = await db.query<RowDataPacket[]>(sqlGetUser, findUserNameData)
    if (rowsGetUser.length) return undefined
    
    userData._id = crypto.randomBytes(16).toString('hex')
    const sqlRegister = `INSERT INTO users(_id, login, pass) VALUES(?, ?, ?)`
    const newUserData: newUserData = [userData._id, userData.login, userData.pass]
    const [newUser] = await db.query<RowDataPacket[]>(sqlRegister, newUserData)
    return newUser
}