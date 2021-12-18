import { loginService, registerService } from '../services/auth'

export const login = (req: any, res: any) => {
    const { login, pass } = req.body

    if (!(login && pass)) return res.status(500).send('Internal Server Error')
    
    const userId: string | undefined = loginService(login, pass)
    
    if (!userId) return res.status(404).json({ "error": "not found" })

    req.session.userId = userId
    res.status(200).json({ "ok": true })
}

export const register = (req: any, res: any) => {
    const { login, pass } = req.body

    if (!(login && pass)) return res.status(500).send('Internal Server Error')
    
    const newUserId: string | undefined = registerService(login, pass)
    
    if (!newUserId) return res.status(500).json({ "error": "already exist" })

    req.session.userId = newUserId
    res.status(200).json({ "ok": true })
}

export const logout = (req: any, res: any) => {
    req.session.destroy((err: any) => {
        if (!err) {
            res.clearCookie('connect.sid').json({ "ok": true })
        }
    })
}