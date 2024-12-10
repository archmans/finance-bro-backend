import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        const { uid } = decoded as { uid: string, email: string };
        req.body = { uid, ...req.body };
        next();
    }
    catch (error: any) {
        console.log("error: ", error);
        return res.sendStatus(403);
    }
}
