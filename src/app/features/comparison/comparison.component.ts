import { Component } from '@angular/core';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent {

  sipResult: any;
  lumpResult: any;

  compare() {
    // Sample calculation
    const sipMonthly = 5000;
    const rate = 12 / 12 / 100;
    const months = 10 * 12;

    let sipValue = 0;
    for (let i = 0; i < months; i++) {
      sipValue = (sipValue + sipMonthly) * (1 + rate);
    }

    const lumpInvestment = 600000;
    const lumpValue = lumpInvestment * Math.pow(1 + 0.12, 10);

    this.sipResult = {
      invested: sipMonthly * months,
      maturity: Math.round(sipValue)
    };

    this.lumpResult = {
      invested: lumpInvestment,
      maturity: Math.round(lumpValue)
    };
  }
}