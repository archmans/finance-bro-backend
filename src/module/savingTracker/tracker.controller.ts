import { Request, Response } from "express";
import { 
    createProfileUser,
    getProfileUser,
    updateProfileUser,
    getAllSavingsUser,
    getAllNamesUser,
    addSavingsUser,
    updateSavingsUser,
    updateSavingsInvestUser,
    deleteSavingsUser
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

export const getAllSavings = async (req: Request, res: Response) => {
    try {
        const result = await getAllSavingsUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const getAllNames = async (req: Request, res: Response) => {
    try {
        const result = await getAllNamesUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const addSavings = async (req: Request, res: Response) => {
    try {
        const result = await addSavingsUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateSavings = async (req: Request, res: Response) => {
    try {
        const result = await updateSavingsUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const updateSavingsInvest = async (req: Request, res: Response) => {
    try {
        const result = await updateSavingsInvestUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export const deleteSavings = async (req: Request, res: Response) => {
    try {
        const result = await deleteSavingsUser(req.body);
        res.status(result.status).json(result.data);
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};