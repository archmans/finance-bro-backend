import environment from "../../utils/environment";

export const predictStockPrice = async (body: { stock_code: string, start_date: string, end_date: string }) => {
    const { stock_code, start_date, end_date } = body;
    try {
        const response = await fetch(environment.ML_API_URL + '/predict', {
            method: 'POST',
            body: JSON.stringify({ stock_code, start_date, end_date }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return { status: 200, data };
    } catch (error: any) {
        throw new Error('Error predicting stock price: ' + error.message);
    }
};