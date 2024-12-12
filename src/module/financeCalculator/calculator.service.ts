import { getUserData, getTotalSavings } from './calculator.repository';
import FourPercentRule from './fourPercentRule';
import Calculator from './calculator';
import { getInflationRate } from '../../utils/inflation';

export const calculate = async (body: { uid: string }) => {
    const { uid } = body;
    const userData = await getUserData(uid);
    if (!userData) {
        throw new Error('User not found');
    }
    try {
        const currentSavings = await getTotalSavings(uid);
        const calculator = new Calculator(
            userData.age,
            userData.retireAge,
            userData.retirePeriod,
            currentSavings,
            userData.monthlyExpenses
        );
        const currentYear = new Date().getFullYear();
        const startInflation = currentYear + (userData.retireAge - userData.age);
        const endInflation = startInflation + userData.retirePeriod;
        const inflationRate = await getInflationRate(startInflation, endInflation) as number;
        if (inflationRate === null || inflationRate === undefined) {
            throw new Error('Inflation rate not found');
        }        
        const fourPercentRule = new FourPercentRule(calculator, inflationRate);
        const savingNeedPerMonth = parseFloat(fourPercentRule.calculateSavingNeedPerMonth().toFixed(2));
        const savingGoal = fourPercentRule.calculateSavingGoal();
        const savingPeriod = fourPercentRule.calculateSavingPeriod();
        return {
            status: 200,
            name : userData.name,
            currentSavings: currentSavings,
            savingNeedPerMonth: savingNeedPerMonth,
            savingGoal: savingGoal,
            savingPeriod: savingPeriod
        };
    } catch (error: any) {
        throw new Error('Error calculating: ' + error.message);
    }
};
