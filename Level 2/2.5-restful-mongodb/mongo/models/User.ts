import { Schema, model } from 'mongoose'

export interface IUser {
    _id: string
    login: string,
    pass: string
}

const UserSchema = new Schema<IUser>({
    login: {
        type: String,
        required: [true, 'no login']
    },
    pass: {
        type: String,
        required: [true, 'no pass']
    }
})

export const User = model<IUser>('User', UserSchema)