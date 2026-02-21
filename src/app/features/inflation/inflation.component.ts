import { Component } from '@angular/core';

@Component({
  selector: 'app-inflation',
  templateUrl: './inflation.component.html',
  styleUrls: ['./inflation.component.css']
})
export class InflationComponent {

  maturity = 1000000;
  inflation = 6;
  years = 10;
  realValue: number = 0;

  calculate() {
    this.realValue = Math.round(
      this.maturity / Math.pow((1 + this.inflation / 100), this.years)
    );
  }
}