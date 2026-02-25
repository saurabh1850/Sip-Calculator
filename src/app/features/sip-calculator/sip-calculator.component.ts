import { Component } from '@angular/core';
import { CalculatorService } from '../../core/services/calculator.service';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.css']
})
export class SipCalculatorComponent {

  monthlyInvestment = 5000;
  lumpsum = 0;
  rate = 12;
  years = 10;
  stepUp = 0;
  result: any;

  // ⭐ NEW: Projection table data
  projectionData: any[] = [];

  constructor(private calcService: CalculatorService) { }

  calculate() {

    const monthly = Number(this.monthlyInvestment);
    const rate = Number(this.rate);
    const years = Number(this.years);
    const stepUp = Number(this.stepUp);
    const lump = Number(this.lumpsum || 0);

    // SIP calculation
    const sipResult = this.calcService.calculateSIP(
      monthly,
      rate,
      years,
      stepUp
    );

    // Lumpsum future value
    const lumpsumFuture = this.calculateLumpsumFutureValue(
      lump,
      rate,
      years
    );

    // Final result merge
    this.result = {
      invested: sipResult.invested + lump,
      maturity: sipResult.maturity + lumpsumFuture,
      returns:
        sipResult.maturity + lumpsumFuture -
        (sipResult.invested + lump)
    };

    // Projection table update
    this.projectionData = this.generateCombinedProjection(
      monthly,
      lump,
      rate
    );
  }
  calculateLumpsumFutureValue(
    principal: number,
    annualRate: number,
    years: number
  ): number {

    if (!principal) return 0;

    const r = annualRate / 100;

    return principal * Math.pow(1 + r, years);
  }
  generateCombinedProjection(
    monthly: number,
    lump: number,
    rate: number
  ): any[] {

    const durations = [
      1, 2, 3, 4, 5, 8, 10, 12, 15, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 35
    ];

    const r = rate / 100 / 12;

    return durations.map(year => {

      const months = year * 12;

      // ⭐ Total SIP invested till that year
      const totalSipInvested = monthly * months;

      // ⭐ Total Invested including Lumpsum
      const totalInvested = totalSipInvested + lump;

      // SIP Future Value
      const sipFV =
        monthly *
        ((Math.pow(1 + r, months) - 1) / r) *
        (1 + r);

      // Lumpsum Future Value
      const lumpFV = lump
        ? lump * Math.pow(1 + rate / 100, year)
        : 0;

      return {
        duration: year,
        sipAmount: totalInvested,   // ✅ NOW includes lumpsum
        futureValue: sipFV + lumpFV
      };
    });
  }
  // Format Lakhs & Crores (Indian format)
  formatIndian(value: number): string {
    if (value >= 10000000) {
      return (value / 10000000).toFixed(1) + ' Crores';
    } else if (value >= 100000) {
      return (value / 100000).toFixed(1) + ' Lakhs';
    } else {
      return value.toLocaleString('en-IN');
    }
  }
}