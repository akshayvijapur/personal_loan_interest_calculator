import React from 'react';
import { Info } from 'lucide-react';
import { LoanDetails } from '../types/calculator';
import Tooltip from './Tooltip';

interface Props {
  onCalculate: (details: LoanDetails) => void;
  onReset: () => void;
}

export default function CalculatorForm({ onCalculate, onReset }: Props) {
  const [formData, setFormData] = React.useState<LoanDetails>({
    loanAmount: 0,
    interestRate: 0,
    loanTerm: 12,
    termUnit: 'months',
    prepaymentAmount: undefined,
    prepaymentDate: undefined
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof LoanDetails, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onCalculate(formData);
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof LoanDetails, string>> = {};
    
    if (formData.loanAmount <= 0) {
      newErrors.loanAmount = 'Loan amount must be greater than 0';
    }
    if (formData.interestRate <= 0) {
      newErrors.interestRate = 'Interest rate must be greater than 0';
    }
    if (formData.loanTerm < 1) {
      newErrors.loanTerm = `Loan term must be at least 1 ${formData.termUnit}`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2">
            <span className="block text-sm font-medium text-gray-700">Loan Amount</span>
            <Tooltip content="Enter the total amount you wish to borrow">
              <Info className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </label>
          <input
            type="number"
            min="1"
            step="0.01"
            value={formData.loanAmount || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              loanAmount: parseFloat(e.target.value)
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.loanAmount && (
            <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2">
            <span className="block text-sm font-medium text-gray-700">Interest Rate (%)</span>
            <Tooltip content="Annual interest rate as a percentage">
              <Info className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.interestRate || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              interestRate: parseFloat(e.target.value)
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.interestRate && (
            <p className="mt-1 text-sm text-red-600">{errors.interestRate}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2">
              <span className="block text-sm font-medium text-gray-700">Loan Term</span>
              <Tooltip content="Duration of the loan">
                <Info className="w-4 h-4 text-gray-400" />
              </Tooltip>
            </label>
            <input
              type="number"
              min="1"
              value={formData.loanTerm}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                loanTerm: parseInt(e.target.value)
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.loanTerm && (
              <p className="mt-1 text-sm text-red-600">{errors.loanTerm}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Term Unit
            </label>
            <select
              value={formData.termUnit}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                termUnit: e.target.value as 'months' | 'years'
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <span className="block text-sm font-medium text-gray-700">Prepayment Amount (Optional)</span>
            <Tooltip content="Amount you plan to pay early">
              <Info className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formData.prepaymentAmount || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              prepaymentAmount: parseFloat(e.target.value)
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <span className="block text-sm font-medium text-gray-700">Prepayment Date (Optional)</span>
            <Tooltip content="When you plan to make the early payment">
              <Info className="w-4 h-4 text-gray-400" />
            </Tooltip>
          </label>
          <input
            type="date"
            value={formData.prepaymentDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              prepaymentDate: e.target.value ? new Date(e.target.value) : undefined
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}