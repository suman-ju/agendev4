import { calculateTotal, validateExpense } from './expenseUtils.js';

test('requires a non-empty title', () => {
  expect(validateExpense('  ', '25')).toBe('Title is required.');
});

test('rejects a non-numeric amount', () => {
  expect(validateExpense('Lunch', 'abc')).toBe('Enter a valid amount.');
  expect(validateExpense('Lunch', '0x10')).toBe('Enter a valid amount.');
});

test('rejects zero and negative amounts', () => {
  expect(validateExpense('Lunch', '0')).toBe('Amount must be greater than 0.');
  expect(validateExpense('Lunch', '-1')).toBe('Amount must be greater than 0.');
});

test('rejects amounts greater than 100000', () => {
  expect(validateExpense('Laptop', '100000.01'))
    .toBe('Amount must not exceed 100000.');
});

test('accepts a positive amount up to 100000', () => {
  expect(validateExpense('Laptop', '100000')).toBe('');
});

test('calculates the total of expense amounts', () => {
  expect(calculateTotal([{ amount: 250 }, { amount: 400 }])).toBe(650);
});
