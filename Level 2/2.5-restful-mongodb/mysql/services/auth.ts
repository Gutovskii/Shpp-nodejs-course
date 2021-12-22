import crypto from 'crypto'
import db from "../db/connect"
import { IUser } from "../interfaces/environment"

export const loginService = async (userData: IUser) => {
    const sql = `SELECT * FROM users WHERE login = '${userData.login}' AND pass = '${userData.pass}'`
    const [rowsGetUser]: any = await (await db).query(sql)
    if (!rowsGetUser.length) return undefined
    const user = rowsGetUser
    return user
}

export const registerService = async (userData: IUser) => {
    const sqlGetUser = `SELECT * FROM users WHERE login = '${userData.login}'`
    const [rowsGetUser]: any = await (await db).query(sqlGetUser)
    if (rowsGetUser.length) return undefined
    
    userData._id = crypto.randomBytes(16).toString('hex')
    const sqlRegister = `INSERT INTO users(_id, login, pass) VALUES(?, ?, ?)`
    const [rowsCreateUser] = await (await db).query(sqlRegister, [userData._id, userData.login, userData.pass])
    const newUser = rowsCreateUser
    console.log('----newUser----\n', newUser)
    return newUser
}