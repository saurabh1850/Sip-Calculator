import { Injectable } from '@angular/core';

export interface SipResult {
  invested: number;
  returns: number;
  maturity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  calculateSIP(
    monthlyInvestment: any,
    rate: any,
    years: any,
    stepUp: any = 0
  ): SipResult {

    // ✅ Force numeric conversion (very important in Angular forms)
    const P = parseFloat(monthlyInvestment) || 0;
    const annualRate = parseFloat(rate) || 0;
    const durationYears = parseFloat(years) || 0;
    const stepUpRate = parseFloat(stepUp) || 0;

    // 🛑 Strong validation (prevents -1, NaN, Infinity)
    if (
      isNaN(P) || isNaN(annualRate) || isNaN(durationYears) ||
      P <= 0 || annualRate <= 0 || durationYears <= 0
    ) {
      return {
        invested: 0,
        returns: 0,
        maturity: 0
      };
    }

    const months = Math.floor(durationYears * 12);
    const monthlyRate = annualRate / 12 / 100;

    // Extra safety if rate becomes 0
    if (monthlyRate <= 0) {
      const investedOnly = P * months;
      return {
        invested: Math.round(investedOnly),
        returns: 0,
        maturity: Math.round(investedOnly)
      };
    }

    let totalInvested = 0;
    let futureValue = 0;
    let currentSIP = P;

    for (let m = 1; m <= months; m++) {

      // 📈 Yearly Step-up (real world logic)
      if (stepUpRate > 0 && m % 12 === 1 && m !== 1) {
        currentSIP = currentSIP * (1 + stepUpRate / 100);
      }

      totalInvested += currentSIP;

      // Monthly compounding SIP formula (stable)
      futureValue = (futureValue + currentSIP) * (1 + monthlyRate);

      // 🛡️ Hard protection against negative/NaN during loop
      if (!isFinite(futureValue) || futureValue < 0) {
        futureValue = 0;
      }
    }

    const estimatedReturns = futureValue - totalInvested;

    return {
      invested: Math.max(0, Math.round(totalInvested)),
      returns: Math.max(0, Math.round(estimatedReturns)),
      maturity: Math.max(0, Math.round(futureValue))
    };
  }
  generateSipProjection(monthlyInvestment: number, rate: number) {
  const durations = [
    1, 2, 3, 4, 5, 8, 10, 12, 15, 18, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29,
    30, 32, 35
  ];

  const r = rate / 12 / 100;

  return durations.map(year => {
    const months = year * 12;

    // Total SIP invested till that duration
    const totalInvested = monthlyInvestment * months;

    // SIP Future Value Formula (standard)
    const futureValue =
      monthlyInvestment *
      (((Math.pow(1 + r, months) - 1) / r) * (1 + r));

    return {
      duration: year,
      sipAmount: Math.round(totalInvested), // ✅ dynamic now
      futureValue: Math.max(0, Math.round(futureValue))
    };
  });
}
}