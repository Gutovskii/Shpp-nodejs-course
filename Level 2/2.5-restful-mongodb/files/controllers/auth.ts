import { Request, Response } from 'express' 
import { loginService, registerService } from '../services/auth'

export const login = (req: Request, res: Response) => {
    try {
        const { login, pass } = req.body
        if (!(login && pass)) return res.status(500).send('Internal Server Error')
        
        const userId: string | undefined = loginService(login, pass)
        if (!userId) return res.status(404).json({ "error": "not found" })

        req.session.userId = userId

        return res.status(200).json({ "ok": true })
    } catch (error) {
        return res.status(500).json({ "error": "Internal Server Error" })
    }
}

export const register = (req: Request, res: Response) => {
    try {
        const { login, pass } = req.body
        if (!(login && pass)) return res.status(500).send('Internal Server Error')
        
        const newUserId: string | undefined = registerService(login, pass)
        if (!newUserId) return res.status(500).json({ "error": "already exist" })
    
        req.session.userId = newUserId
    
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