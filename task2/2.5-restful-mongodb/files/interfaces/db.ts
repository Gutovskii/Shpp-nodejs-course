export interface ITask {
    _id: string,
    text: string,
    checked: boolean
}

export interface IUser {
    _id: string,
    login: string,
    pass: string,
    tasks: ITask[]
}

export interface IDb {
    users: IUser[]
}