import { Request, Response } from "express";
import { wishfulService } from "../services/wishfulAnalytics";

export const wishfulUpdate = async (req: Request, res: Response) => {
    const id = req.params.id;
    
    await wishfulService(id);

    return res.json({ done: true });
}