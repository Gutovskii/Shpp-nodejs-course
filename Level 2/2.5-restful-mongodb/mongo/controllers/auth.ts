import { Request, Response } from 'express'
import { User } from '../models/User'

export const login = async (req: Request, res: Response) => {
    try {
        const { login, pass } = req.body
        if (!(login && pass)) return res.status(404).json({ "ok": false })

        const user = await User.findOne({ login, pass })
        if (!user) return res.status(404).json({ "error": "not found" })

        req.session.userId = user._id

        return res.status(200).json({ "ok": true })
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        const { login, pass } = req.body
        if (!(login && pass)) return res.status(404).json({ "ok": false })
    
        const user = await User.findOne({ login })
        if (user) return res.status(404).json({ "error": "already exist" })
    
        await User.create({ login, pass })
        
        return res.status(200).json({ "ok": true })
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

export const logout = (req: Request, res: Response) => {
    req.session.destroy((err: unknown) => {
        if (!err) {
            res.clearCookie('connect.sid').json({ "ok": true })
        }
    })
}