import crypto from 'crypto'
import { Request, Response } from 'express'
import { RowDataPacket } from 'mysql2'
import { getItemsService, addItemService, changeItemService, deleteItemService } from '../services/items'

export const getItems = async (req: Request, res: Response) => {
    if (!req.session.userId) return res.status(500).json({ "error": "forbidden" })

    try {
        const forUser = req.session.userId
        const tasks: RowDataPacket[] | undefined = await getItemsService(forUser)

        res.status(200).json({ items: tasks })
    } catch (err) {
        res.status(500).json(err)
    }
}

export const addItem = async (req: Request, res: Response) => {
    try {
        if (!req.session.userId || !req.body.hasOwnProperty('text')) return res.status(400).json({ "error": "Bad Request" })

        req.body._id = crypto.randomBytes(10).toString('hex')
        req.body.forUser = req.session.userId
        req.body.checked = false
        
        const result: RowDataPacket[] | undefined = await addItemService(req.body)

        if (!result) { 
            return res.status(404).json({ "ok": false })
        }
        res.status(201).json({ _id: req.body._id })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const changeItem = async (req: Request, res: Response) => {
    try {
        if (!req.session.userId) return res.status(400).send({ "error": "Bad Request" })
        
        const result: RowDataPacket[] | undefined = await changeItemService(req.body)
        
        if (!result) {
            return res.status(404).json({ error: 'Bad Request' })
        }
        res.status(201).json({ ok: true })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        if (!req.session.userId || !req.body.hasOwnProperty('_id')) return res.status(400).json({ "error": "Bad Request"})

        const task: RowDataPacket[] | undefined = await deleteItemService(req.body._id)
        if (!task) {
            return res.status(404).json({ error: 'Bad Request' })
        }
        res.status(200).json({ ok: true })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}