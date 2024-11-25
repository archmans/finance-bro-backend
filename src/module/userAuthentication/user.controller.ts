import { Request, Response } from 'express';
import { registerUser, loginUser } from './user.service';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const newUser = await registerUser(email, password);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const token = await loginUser(email, password);
        res.status(200).json(token);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
