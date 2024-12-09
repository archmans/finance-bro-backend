import { Request, Response, NextFunction } from 'express';
import admin from '../config/auth';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log("authHeader: ", authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token: ", token);

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        console.log("decodedToken: ", decodedToken);
        req.body.uid = decodedToken.uid;
        console.log("req.body.uid: ", req.body.uid);
        next();
    } catch (error) {
        return res.sendStatus(403);
    }
}
