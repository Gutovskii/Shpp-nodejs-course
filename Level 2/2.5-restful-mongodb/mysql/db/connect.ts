import mysql from 'mysql2/promise'
import { optionsdb } from './options'

const db = mysql.createPool(optionsdb)

export default db