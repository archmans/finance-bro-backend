export default class Calculator {
    currentAge: number;
    retirementAge: number;
    retirementPeriod: number;
    currentSavings: number;

    constructor(currentAge: number, retirementAge: number, retirementPeriod: number, currentSavings: number) {
        this.currentAge = currentAge;
        this.retirementAge = retirementAge;
        this.retirementPeriod = retirementPeriod;
        this.currentSavings = currentSavings;
    }

}
