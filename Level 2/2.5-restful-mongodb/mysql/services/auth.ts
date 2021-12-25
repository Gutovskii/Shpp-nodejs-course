import crypto from 'crypto'
import db from "../db/connect"
import { IUser, findUserNameData, loginUserData, newUserData } from "../interfaces/environment"

export const loginService = async (userData: IUser) => {
    const sql = `SELECT * FROM users WHERE login = ? AND pass = ?`
    const loginUserData: loginUserData = [userData.login, userData.pass]
    const [rowsGetUser]: any = await db.query(sql, loginUserData)
    if (!rowsGetUser.length) return undefined
    const user = rowsGetUser
    return user
}

export const registerService = async (userData: IUser) => {
    const sqlGetUser = `SELECT * FROM users WHERE login = ?`
    const findUserNameData: findUserNameData = [userData.login]
    const [rowsGetUser]: any = await db.query(sqlGetUser, findUserNameData)
    if (rowsGetUser.length) return undefined
    
    userData._id = crypto.randomBytes(16).toString('hex')
    const sqlRegister = `INSERT INTO users(_id, login, pass) VALUES(?, ?, ?)`
    const newUserData: newUserData = [userData._id, userData.login, userData.pass]
    const [rowsCreateUser] = await db.query(sqlRegister, newUserData)
    const newUser = rowsCreateUser
    return newUser
}