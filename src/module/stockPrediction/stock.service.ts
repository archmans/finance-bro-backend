import environment from "../../utils/environment";
import axios from "axios";

export const predictStockPrice = async (body: { stock_code: string, start_date: string, end_date: string }) => {
    const { stock_code, start_date, end_date } = body;
    try {
        const response = await axios.post(`${environment.ML_API_URL}`, {
            stock_code,
            start_date,
            end_date
        });
        console.log(response.data);
        const data = await response.data;
        return { status: 200, data };
    } catch (error: any) {
        throw new Error('Error predicting stock price: ' + error.message);
    }
};