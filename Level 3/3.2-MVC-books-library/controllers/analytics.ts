import { Request, Response, urlencoded } from "express";
import { analyticsService } from "../services/analytics";

export const analyticsUpgrade = async (req: Request, res: Response) => {
    const { id } = req.body;
    
    try {
        await analyticsService(id, req.path);
        return res.json({ done: true });
    } catch (error) {
        return res.json({ error });
    }
}