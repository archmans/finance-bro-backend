import Calculator from "./calculator";

export default class FourPercentRule {
    calculator: Calculator;
    percent: number;

    constructor(calculator: Calculator, percent: number = 4 / 100) {
        this.calculator = calculator;
        this.percent = percent;
    }

    calculateNeedsPerYear(): number {
        return this.calculator.monthlylivingcost * 12 * (1 + this.percent);
    }

    calculateSavingGoal(): number {
        return this.calculateNeedsPerYear() * this.calculator.retirementPeriod;
    }

    calculateSavingNeed(): number {
        return this.calculateSavingGoal() - this.calculator.currentSavings;
    }

    calculateSavingPeriod():number{
        return this.calculator.retirementAge - this.calculator.currentAge;
    }

    calculateSavingNeedPerYear(): number {
        return this.calculateSavingNeed() / this.calculateSavingPeriod();
    }

    calculateSavingNeedPerMonth(): number {
        return this.calculateSavingNeedPerYear() / 12;
    }
}