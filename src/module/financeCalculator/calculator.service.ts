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
        console.log(userData.age, userData.retireAge, userData.retirePeriod, currentSavings, userData.monthlyExpenses);
        const inflationRate = await getInflationRate();
        if (!inflationRate) {
            throw new Error('Inflation rate not found');
        }
        console.log("Inflation rate: ", inflationRate);
        const fourPercentRule = new FourPercentRule(calculator, inflationRate);
        return {
            status: 200,
            savingNeedPerMonth: fourPercentRule.calculateSavingNeedPerMonth(),
            savingGoal: fourPercentRule.calculateSavingGoal(),
        };
    } catch (error: any) {
        throw new Error('Error calculating: ' + error.message);
    }
};
