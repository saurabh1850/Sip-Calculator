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

  constructor(private calcService: CalculatorService) {}

   calculate() {
  this.result = this.calcService.calculateSIP(
    Number(this.monthlyInvestment),
    Number(this.rate),
    Number(this.years),
    Number(this.stepUp)
  );
}
}