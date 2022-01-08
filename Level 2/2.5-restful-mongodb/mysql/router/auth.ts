import { Request, Response, NextFunction } from 'express'

import {
    login,
    register,
    logout
} from '../controllers/auth'

export const authRouter = (req: Request, res: Response, next: NextFunction) => {
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

export default authRouter