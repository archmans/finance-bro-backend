import { Request, Response } from "express";
import { predictStockPrice } from "./stock.service";

export const predictStock = async (req: Request, res: Response) => {
    try {
        const result = await predictStockPrice(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}