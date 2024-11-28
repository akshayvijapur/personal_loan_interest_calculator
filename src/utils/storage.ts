import { HistoryEntry } from '../types/calculator';

export function saveToHistory(entry: HistoryEntry): void {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem('loanCalculatorHistory', JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  const history = localStorage.getItem('loanCalculatorHistory');
  return history ? JSON.parse(history) : [];
}

export function deleteHistoryEntry(id: string): void {
  const history = getHistory().filter(entry => entry.id !== id);
  localStorage.setItem('loanCalculatorHistory', JSON.stringify(history));
}

export function exportToCSV(): string {
  const history = getHistory();
  const headers = ['Date', 'Loan Amount', 'Interest Rate', 'Term', 'Prepayment', 'Total Interest'];
  const rows = history.map(entry => [
    new Date(entry.date).toLocaleDateString(),
    entry.loanAmount.toFixed(2),
    entry.interestRate.toFixed(2),
    entry.loanTerm,
    entry.prepaymentAmount?.toFixed(2) || '0.00',
    entry.result.totalInterest.toFixed(2)
  ]);
  
  return [headers, ...rows].map(row => row.join(',')).join('\n');
}