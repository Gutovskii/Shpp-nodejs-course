import mysql from 'mysql2/promise'

export const optionsdb: mysql.ConnectionOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task-manager-nodejs'
}