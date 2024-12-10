import { Request, Response } from "express";
import { calculate } from "./calculator.service";

export const calculateController = async (req: Request, res: Response) => {
    try {
        const result = await calculate(req.body);
        res.status(result.status).json(result);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};