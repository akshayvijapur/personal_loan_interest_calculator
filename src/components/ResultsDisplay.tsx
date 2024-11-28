import React from 'react';
import { CalculationResult } from '../types/calculator';
import AmortizationSchedule from './AmortizationSchedule';

interface Props {
  result: CalculationResult | null;
}

export default function ResultsDisplay({ result }: Props) {
  if (!result) return null;

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Calculation Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Monthly Payment</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(result.monthlyPayment)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Total Interest</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(result.totalInterest)}
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500">Payoff Date</p>
            <p className="text-2xl font-bold text-gray-900">
              {result.payoffDate.toLocaleDateString()}
            </p>
          </div>

          {result.adjustedInterest && (
            <div className="p-4 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-500">Adjusted Interest (with Prepayment)</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(result.adjustedInterest)}
              </p>
              <p className="text-sm text-green-600 mt-1">
                Save {formatCurrency(result.totalInterest - result.adjustedInterest)}
              </p>
            </div>
          )}
        </div>
      </div>

      <AmortizationSchedule schedule={result.schedule} />
    </div>
  );
}