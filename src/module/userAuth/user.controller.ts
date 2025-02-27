import { Request, Response } from 'express';
import { loginOrRegisterUser,  deleteUser } from './user.service';

export const loginOrRegister = async (req: Request, res: Response) => {
    try {
        const result = await loginOrRegisterUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

export const deleteUserController = async (req: Request, res: Response) => {
    try {
        const result = await deleteUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}