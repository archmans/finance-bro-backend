export default class Calculator {
    currentAge: number;
    retirementAge: number;
    retirementPeriod: number;
    currentSavings: number;
    monthlylivingcost: number;

    constructor(currentAge: number, retirementAge: number, retirementPeriod: number, currentSavings: number, monthlylivingcost: number) {
        this.currentAge = currentAge;
        this.retirementAge = retirementAge;
        this.retirementPeriod = retirementPeriod;
        this.currentSavings = currentSavings;
        this.monthlylivingcost = monthlylivingcost;
    }

}
