import { parse } from "path";
import database from "../config/database";

export const getInflationRate = async (startYear: number, endYear: number) => {
    try {
        const inflationRatesRef = database.collection("utils").doc('inflationRates');
        const inflationRatesDoc = await inflationRatesRef.get();
        if (inflationRatesDoc.exists) {
            const inflationRatesData = inflationRatesDoc.data();
            const startInflationRate = inflationRatesData?.[startYear.toString()];
            const endInflationRate = inflationRatesData?.[endYear.toString()];
            if (startInflationRate && endInflationRate) {
                const inflationRate = parseFloat(endInflationRate) - parseFloat(startInflationRate);
                return parseFloat(inflationRate.toFixed(2))/100;
            } else {
                console.error("Inflation rate not found for the specified years.");
                return null;
            }
        } else {
            console.error("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting inflation rate:", error);
        return null;
    }
};