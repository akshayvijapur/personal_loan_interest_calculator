import { LoanDetails, CalculationResult, AmortizationEntry } from '../types/calculator';

export function calculateLoan(details: LoanDetails): CalculationResult {
  const { loanAmount, interestRate, loanTerm, termUnit, prepaymentAmount, prepaymentDate } = details;
  const totalMonths = termUnit === 'years' ? loanTerm * 12 : loanTerm;
  const monthlyRate = interestRate / 100 / 12;
  
  // Calculate standard monthly payment using amortization formula
  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  // Generate amortization schedule
  const schedule: AmortizationEntry[] = [];
  let remainingBalance = loanAmount;
  let totalInterest = 0;
  let currentDate = new Date();

  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    let principalPayment = monthlyPayment - interestPayment;
    let prepaymentForMonth = 0;

    // Handle prepayment if applicable
    if (prepaymentAmount && prepaymentDate) {
      const prepaymentMonth = Math.floor(
        (prepaymentDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
      ) + 1;

      if (month === prepaymentMonth) {
        prepaymentForMonth = prepaymentAmount;
        remainingBalance -= prepaymentAmount;
      }
    }

    // Adjust final payment if needed
    if (remainingBalance < principalPayment) {
      principalPayment = remainingBalance;
    }

    remainingBalance -= principalPayment;
    totalInterest += interestPayment;

    const paymentDate = new Date(currentDate);
    paymentDate.setMonth(currentDate.getMonth() + month - 1);

    schedule.push({
      paymentNumber: month,
      paymentDate,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      remainingBalance,
      prepayment: prepaymentForMonth || undefined
    });

    if (remainingBalance <= 0) break;
  }

  const payoffDate = new Date(currentDate);
  payoffDate.setMonth(currentDate.getMonth() + schedule.length);

  // Calculate adjusted interest with prepayment
  let adjustedInterest;
  if (prepaymentAmount && prepaymentDate) {
    adjustedInterest = schedule.reduce((sum, entry) => sum + entry.interest, 0);
  }

  return {
    monthlyPayment,
    totalInterest,
    payoffDate,
    adjustedInterest,
    schedule
  };
}