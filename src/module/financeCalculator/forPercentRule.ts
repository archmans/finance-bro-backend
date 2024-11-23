import Calculator from "./calculator";

class FourPercentRule {
    calculator: Calculator;
    percent: number;

    constructor(calculator: Calculator, percent: number = 4 / 100) {
        this.calculator = calculator;
        this.percent = percent;
    }

    calculateNeedsPerYear(): number {
        return this.calculator.currentSavings * this.percent;
    }

    calculateSavingGoal(): number {
        return this.calculateNeedsPerYear() * this.calculator.retirementPeriod;
    }

    calculateSavingNeed(): number {
        return this.calculateSavingGoal() - this.calculator.currentSavings;
    }
}