import React from 'react';
import { Calculator } from 'lucide-react';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import HistoryTable from './components/HistoryTable';
import { LoanDetails, CalculationResult, HistoryEntry } from './types/calculator';
import { calculateLoan } from './utils/calculations';
import { saveToHistory, getHistory, deleteHistoryEntry } from './utils/storage';

function App() {
  const [result, setResult] = React.useState<CalculationResult | null>(null);
  const [history, setHistory] = React.useState<HistoryEntry[]>([]);

  React.useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleCalculate = (details: LoanDetails) => {
    const calculationResult = calculateLoan(details);
    setResult(calculationResult);

    const historyEntry: HistoryEntry = {
      id: crypto.randomUUID(),
      date: new Date(),
      ...details,
      result: calculationResult
    };

    saveToHistory(historyEntry);
    setHistory(getHistory());
  };

  const handleReset = () => {
    setResult(null);
  };

  const handleDeleteHistory = (id: string) => {
    deleteHistoryEntry(id);
    setHistory(getHistory());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-center mb-8">
            <Calculator className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900">
              Personal Loan Calculator
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <CalculatorForm
                onCalculate={handleCalculate}
                onReset={handleReset}
              />
              {result && <ResultsDisplay result={result} />}
            </div>
            
            <div>
              <HistoryTable
                history={history}
                onDelete={handleDeleteHistory}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;