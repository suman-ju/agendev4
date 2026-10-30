import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App.jsx';

function addExpense({ title, amount, category = 'Food' }) {
  fireEvent.change(screen.getByLabelText('Title'), {
    target: { value: title },
  });
  fireEvent.change(screen.getByLabelText('Amount'), {
    target: { value: amount },
  });
  fireEvent.change(screen.getByLabelText('Category'), {
    target: { value: category },
  });
  fireEvent.click(screen.getByRole('button', { name: 'Add expense' }));
}

test('adds a valid expense and updates the total and count', () => {
  render(<App />);

  addExpense({ title: 'Lunch', amount: '250', category: 'Food' });

  expect(screen.getByText('Lunch')).toBeInTheDocument();
  expect(screen.getByRole('status', { name: 'Visible total' }))
    .toHaveTextContent('$250.00');
  expect(screen.getByRole('status', { name: 'Visible expense count' }))
    .toHaveTextContent('1');
  expect(screen.getByLabelText('Title')).toHaveValue('');
  expect(screen.getByLabelText('Amount')).toHaveValue('');
});

test('rejects an empty title', () => {
  render(<App />);

  addExpense({ title: '  ', amount: '250' });

  expect(screen.getByRole('alert')).toHaveTextContent('Title is required.');
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

test.each([
  ['not-a-number', 'Enter a valid amount.'],
  ['0', 'Amount must be greater than 0.'],
  ['-5', 'Amount must be greater than 0.'],
  ['100000.01', 'Amount must not exceed 100000.'],
])('rejects invalid amount %s', (amount, error) => {
  render(<App />);

  addExpense({ title: 'Invalid expense', amount });

  expect(screen.getByRole('alert')).toHaveTextContent(error);
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

test('filters expenses by category and updates the visible total and count', () => {
  render(<App />);
  addExpense({ title: 'Lunch', amount: '250', category: 'Food' });
  addExpense({ title: 'Cab', amount: '400', category: 'Travel' });

  fireEvent.change(screen.getByLabelText('Filter by category'), {
    target: { value: 'Food' },
  });

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(screen.getByText('Lunch')).toBeInTheDocument();
  expect(screen.queryByText('Cab')).not.toBeInTheDocument();
  expect(screen.getByRole('status', { name: 'Visible expense count' }))
    .toHaveTextContent('1');
  expect(screen.getByRole('status', { name: 'Visible total' }))
    .toHaveTextContent('$250.00');
});

test('deletes an expense and recalculates the total and count', () => {
  render(<App />);
  addExpense({ title: 'Lunch', amount: '250' });
  addExpense({ title: 'Cab', amount: '400', category: 'Travel' });

  const lunch = screen.getAllByRole('listitem')[0];
  fireEvent.click(within(lunch).getByRole('button', { name: 'Delete Lunch' }));

  expect(screen.queryByText('Lunch')).not.toBeInTheDocument();
  expect(screen.getByRole('status', { name: 'Visible expense count' }))
    .toHaveTextContent('1');
  expect(screen.getByRole('status', { name: 'Visible total' }))
    .toHaveTextContent('$400.00');
});
