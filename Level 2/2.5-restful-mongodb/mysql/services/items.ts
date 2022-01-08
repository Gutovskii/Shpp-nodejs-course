import { RowDataPacket } from 'mysql2'
import db from '../db/connect'
import { ITask, deleteTaskData, itemsForUserData, newTaskData, updatedTaskData } from '../interfaces/environment'

export const getItemsService = async (forUser: string): Promise<RowDataPacket[]> => {
    const sql: string = `SELECT * FROM tasks WHERE forUser = ? ORDER BY id`
    const itemsForUserData: itemsForUserData = [forUser]
    const [tasks] = await db.query<RowDataPacket[]>(sql, itemsForUserData)
    return tasks
}

export const addItemService = async (task: ITask): Promise<RowDataPacket[]> => {
    const sql: string = `INSERT INTO tasks(_id, forUser, text, checked) VALUES(?, ?, ?, ?)`
    const newTaskData: newTaskData = [task._id, task.forUser, task.text, task.checked]
    const [newTask] = await db.query<RowDataPacket[]>(sql, newTaskData)
    return newTask
}

export const changeItemService = async (task: ITask): Promise<RowDataPacket[]> => {
    const sql: string = `UPDATE tasks SET text = ?, checked = ? WHERE _id = ?`
    const updatedTaskData: updatedTaskData = [task.text, task.checked, task._id]
    const [changedTask] = await db.query<RowDataPacket[]>(sql, updatedTaskData)
    return changedTask
}

export const deleteItemService = async (_id: string): Promise<RowDataPacket[]> => {
    const sql: string = `DELETE FROM tasks WHERE _id = ?`
    const deleteTaskData: deleteTaskData = [_id]
    const [deleteTask] = await db.query<RowDataPacket[]>(sql, deleteTaskData)
    return deleteTask
}