import {
    login,
    register,
    logout
} from '../controllers/auth'

export const authRouter = (req: any, res: any, next: any) => {
    switch (req.query.action) {
        case 'login':
            return login(req, res)
        case 'register':
            return register(req, res)
        case 'logout':
            return logout(req, res)
        default:
            next()
    }
}