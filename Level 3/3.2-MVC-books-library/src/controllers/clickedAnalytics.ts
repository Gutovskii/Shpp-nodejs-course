import { Request, Response } from "express";
import { clickedService } from "../services/clickedAnalytics";

export const clickedUpdate = async (req: Request, res: Response) => {
    const id = req.params.id;
    
    await clickedService(id);

    return res.json({ done: true });
}