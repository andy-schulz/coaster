
export class ExecutionStatisticResult {

    constructor() {
        this.totalFailed = 0;
        this.totalPassed = 0;
        this.invalid = 0;
    }
    totalPassed: number;
    totalFailed: number;
    invalid: number;
}