export interface ITask {
    _id: string,
    forUser: string,
    text: string,
    checked: boolean
}

export interface IUser {
    _id?: string,
    login: string,
    pass: string
}

export type newTaskData = [string, string, string, boolean]
export type updatedTaskData = [string, boolean, string]
export type deleteTaskData = [string]