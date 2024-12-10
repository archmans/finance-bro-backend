import database from "../config/database";

export const getInflationRate = async (): Promise<number | null> => {
    try {
        const inflationRef = database.collection('settings').doc('inflation');
        const doc = await inflationRef.get();
        if (doc.exists) {
            const data = doc.data();
            return data?.rate || null;
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting inflation rate:", error);
        return null;
    }
};