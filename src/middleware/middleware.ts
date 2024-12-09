import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log("authHeader: ", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token: ", token);

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        console.log("decoded: ", decoded);
        req.body.uid = decoded;
        next();
    }
    catch (error: any) {
        console.log("error: ", error);
        return res.sendStatus(403);
    }
}
