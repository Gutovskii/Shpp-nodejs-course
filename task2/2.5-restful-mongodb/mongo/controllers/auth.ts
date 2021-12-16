import { User } from '../models/User'

export const login = async (req: any, res: any) => {
    const { login, pass } = req.body

    if (!(login && pass)) return res.status(404).json({ "ok": false })

    const user = await User.findOne({ login, pass })
    
    if (!user) return res.status(404).json({ "error": "not found" })

    req.session.userId = user._id

    res.status(200).json({ "ok": true })
}

export const register = async (req: any, res: any) => {
    const { login, pass } = req.body
    
    if (!(login && pass)) return res.status(404).json({ "ok": false })

    const user = await User.findOne({ login })
    
    if (user) return res.status(404).json({ "error": "already exist" })

    await User.create({ login, pass })

    res.status(200).json({ "ok": true })
}

export const logout = (req: any, res: any) => {
    req.session.destroy((err: any) => {
        if (!err) {
            res.clearCookie('connect.sid').json({ "ok": true })
        }
    })
}