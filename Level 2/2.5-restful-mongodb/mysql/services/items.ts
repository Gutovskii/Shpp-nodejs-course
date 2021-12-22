import db from '../db/connect'
import { deleteTaskData, ITask, newTaskData, updatedTaskData } from '../interfaces/environment'

export const getItemsService = async (forUser: string) => {
    const sql: string = `SELECT * FROM tasks WHERE forUser = '${forUser}' ORDER BY checked DESC`
    const [rows] = await (await db).execute(sql)
    const tasks = rows
    return tasks
}

export const addItemService = async (task: ITask) => {
    const sql: string = `INSERT INTO tasks(_id, forUser, text, checked) VALUES(?, ?, ?, ?)`
    const newTaskData: newTaskData = [task._id, task.forUser, task.text, task.checked]
    const [rows] = await (await db).query(sql, newTaskData)
    const newTask = rows
    return newTask
}

export const changeItemService = async (task: ITask) => {
    const sql: string = `UPDATE tasks SET text = ?, checked = ? WHERE _id = ?`
    console.log('----taskToChange----\n', task)
    const updatedTaskData: updatedTaskData = [task.text, task.checked, task._id]
    const [rows] = await (await db).query(sql, updatedTaskData)
    console.log('----rows----\n', rows)
    return rows
}

export const deleteItemService = async (_id: string) => {
    const sql: string = `DELETE FROM tasks WHERE _id = ?`
    const deleteTaskData: deleteTaskData = [_id]
    const [rows] = await (await db).query(sql, deleteTaskData)
    return rows
}