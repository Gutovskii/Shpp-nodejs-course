import { addItemService, editItemService, deleteItemService, getItemsService } from '../services/items'
import { ITask } from '../interfaces/db'

const dbUrn: string = './db/db.json'

export const getItems = async (req: any, res: any) => {
    try {
        if (!req.session.userId) return res.status(500).json({ "error": "forbidden" })

        const userTasks: ITask[] | undefined = getItemsService(req.session.userId)
        
        return res.status(200).json({ items: userTasks })
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

export const addItem = (req: any, res: any) => {
    try {
        if (!req.session.userId && !req.body.hasOwnProperty('text')) return res.status(400).send('400 Bad Request')

        const newTask: ITask = addItemService(req.session.userId, req.body.text)
        
        return res.status(200).json({ _id: newTask._id })
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

export const editItem = (req: any, res: any) => {
    try {
        if (!req.session.userId && !req.body.hasOwnProperty('_id')) res.status(400).send('400 Bad Request')

        const newTask: ITask | undefined = editItemService(req.session.userId, req.body)
    
        if (!newTask) {
            return res.status(404).json({ "ok": false })
        }
        
        return res.status(200).json({ "ok": true })
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

export const deleteItem = (req: any, res: any) => {
    try {
        if (!req.session.userId && !req.body.hasOwnProperty('_id')) return res.status(400).send('400 Bad Request')

        const deletedTask: ITask | undefined = deleteItemService(req.session.userId, req.body._id)
    
        if (!deletedTask) {
            return res.status(404).json({ "ok": false })
        }
    
        return res.status(200).json({ "ok": true })
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}
