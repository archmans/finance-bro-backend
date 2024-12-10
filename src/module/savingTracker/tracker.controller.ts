import { Request, Response } from "express";
import { 
    createProfileUser,
    getProfileUser,
    updateProfileUser
} from "./tracker.service";

export const createProfile = async (req: Request, res: Response) => {
    try {
        const result = await createProfileUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    try {
        const result = await getProfileUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    try {
        const result = await updateProfileUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
