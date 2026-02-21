import { Component } from '@angular/core';

@Component({
  selector: 'app-lumpsum-calculator',
  templateUrl: './lumpsum-calculator.component.html',
  styleUrls: ['./lumpsum-calculator.component.css']
})
export class LumpsumCalculatorComponent {

  amount = 100000;
  rate = 12;
  years = 10;
  result: any;

  calculate() {
    const maturity = this.amount * Math.pow((1 + this.rate / 100), this.years);
    this.result = {
      invested: this.amount,
      maturity: Math.round(maturity),
      returns: Math.round(maturity - this.amount)
    };
  }
}