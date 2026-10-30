export const CATEGORIES = ['Food', 'Travel', 'Bills', 'Other'];

export function validateExpense(title, amount) {
  if (!title.trim()) return 'Title is required.';

  const amountText = String(amount).trim();
  if (!/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(amountText)) {
    return 'Enter a valid amount.';
  }

  const numericAmount = Number(amountText);
  if (!Number.isFinite(numericAmount)) return 'Enter a valid amount.';
  if (numericAmount <= 0) return 'Amount must be greater than 0.';
  if (numericAmount > 100000) return 'Amount must not exceed 100000.';

  return '';
}

export function calculateTotal(expenses) {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
