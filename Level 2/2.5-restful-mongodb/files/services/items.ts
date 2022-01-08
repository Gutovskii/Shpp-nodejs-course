import fs from 'fs'
import crypto from 'crypto'
import { IDb, ITask, IUser } from '../interfaces/db'

const dbUrn: string = './db/db.json'

export const getItemsService = (userId: string): ITask[] | undefined => {
    const database: IDb = JSON.parse(fs.readFileSync(dbUrn, 'utf-8'))
    const userTasks: ITask[] | undefined = database.users.find((userData: IUser) => userData._id === userId)?.tasks

    return userTasks
}

export const addItemService = (userId: string, text: string): ITask => {
    const database: IDb = JSON.parse(fs.readFileSync(dbUrn, 'utf-8'))
    const userIndex: number = database.users.findIndex((userData: IUser) => userData._id === userId)
    const _id: string = crypto.randomBytes(10).toString('hex')
    const newTask: ITask = {
        _id,
        text,
        checked: false
    }
    database.users[userIndex].tasks.push(newTask)
    const newData: string = JSON.stringify(database, undefined, '\t')
    fs.writeFileSync(dbUrn, newData)

    return newTask
}

export const changeItemService = (userId: string, newTask: ITask): ITask | undefined => {
    const database: IDb = JSON.parse(fs.readFileSync(dbUrn, 'utf-8'))
    const userIndex: number = database.users.findIndex((userData: IUser) => userData._id === userId)
    const taskToChangeIndex: number = database.users[userIndex].tasks.findIndex((task: ITask) => task._id === newTask._id)
    if (taskToChangeIndex === -1) {
        return undefined
    }
    database.users[userIndex].tasks[taskToChangeIndex] = newTask // put
    const newData: string = JSON.stringify(database, undefined, '\t')
    fs.writeFileSync(dbUrn, newData)

    return newTask
}

export const deleteItemService = (userId: string, _id: string): ITask | undefined => {
    const data = JSON.parse(fs.readFileSync(dbUrn, 'utf-8'))
    const userIndex: number = data.users.findIndex((user: IUser) => user._id === userId)
    const taskToDeleteIndex: number = data.users[userIndex].tasks.findIndex((task: ITask) => task._id === _id)
    if (taskToDeleteIndex === -1) {
        return undefined
    }
    const deletedTask: ITask = data.users[userIndex].tasks[taskToDeleteIndex]
    data.users[userIndex].tasks.splice(taskToDeleteIndex, 1) // delete
    const newData: string = JSON.stringify(data, undefined, '\t')
    fs.writeFileSync(dbUrn, newData)

    return deletedTask
}