export interface LoanDetails {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  termUnit: 'months' | 'years';
  prepaymentAmount?: number;
  prepaymentDate?: Date;
}

export interface CalculationResult {
  monthlyPayment: number;
  totalInterest: number;
  payoffDate: Date;
  adjustedInterest?: number;
  schedule: AmortizationEntry[];
}

export interface AmortizationEntry {
  paymentNumber: number;
  paymentDate: Date;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
  prepayment?: number;
}

export interface HistoryEntry extends LoanDetails {
  id: string;
  date: Date;
  result: CalculationResult;
}