import React from 'react';
import { AmortizationEntry } from '../types/calculator';

interface Props {
  schedule: AmortizationEntry[];
}

export default function AmortizationSchedule({ schedule }: Props) {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Amortization Schedule</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment #</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prepayment</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schedule.map((entry) => (
              <tr key={entry.paymentNumber} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {entry.paymentNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {entry.paymentDate.toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(entry.payment)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(entry.principal)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(entry.interest)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {entry.prepayment ? formatCurrency(entry.prepayment) : '-'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatCurrency(entry.remainingBalance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}