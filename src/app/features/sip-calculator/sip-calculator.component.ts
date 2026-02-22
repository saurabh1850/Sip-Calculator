import { Component } from '@angular/core';
import { CalculatorService } from '../../core/services/calculator.service';

@Component({
  selector: 'app-sip-calculator',
  templateUrl: './sip-calculator.component.html',
  styleUrls: ['./sip-calculator.component.css']
})
export class SipCalculatorComponent {

  monthlyInvestment = 5000;
  rate = 12;
  years = 10;
  stepUp = 0;
  result: any;

  // ⭐ NEW: Projection table data
  projectionData: any[] = [];

  constructor(private calcService: CalculatorService) {}

  calculate() {
    // Main SIP result
    this.result = this.calcService.calculateSIP(
      Number(this.monthlyInvestment),
      Number(this.rate),
      Number(this.years),
      Number(this.stepUp)
    );

    // ⭐ Generate projection table (below card)
    this.projectionData = this.calcService.generateSipProjection(
      Number(this.monthlyInvestment),
      Number(this.rate)
    );
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