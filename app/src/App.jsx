import { useMemo, useRef, useState } from 'react';
import CategoryFilter from './components/CategoryFilter.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { calculateTotal, CATEGORIES, formatCurrency, validateExpense } from './expenseUtils.js';
import './App.css';

// App owns expense and form/filter state; child components receive state values and callbacks as props.
function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [error, setError] = useState('');
  const nextExpenseId = useRef(0);

  const visibleExpenses = useMemo(
    () => selectedCategory === 'All'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory),
    [expenses, selectedCategory]
  );
  const total = calculateTotal(visibleExpenses);

  function addExpense(event) {
    event.preventDefault();

    const validationError = validateExpense(title, amount);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!CATEGORIES.includes(category)) {
      setError('Select a valid category.');
      return;
    }

    setExpenses((current) => [
      ...current,
      {
        id: nextExpenseId.current++,
        title: title.trim(),
        amount: Number(amount),
        category,
      },
    ]);
    setTitle('');
    setAmount('');
    setCategory(CATEGORIES[0]);
    setError('');
  }

  function deleteExpense(id) {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  }

  return (
    <main className="tracker-page">
      <section className="tracker-card" aria-labelledby="tracker-title">
        <header className="tracker-header">
          <p className="eyebrow">KEEP YOUR SPENDING IN SIGHT</p>
          <h1 id="tracker-title">Expense Tracker</h1>
          <p className="subtitle">A clear view of where your money goes.</p>
        </header>

        <ExpenseForm
          title={title}
          amount={amount}
          category={category}
          error={error}
          onTitleChange={setTitle}
          onAmountChange={setAmount}
          onCategoryChange={setCategory}
          onSubmit={addExpense}
        />

        <section className="expenses-section" aria-labelledby="expenses-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR RECORDS</p>
              <h2 id="expenses-title">Expenses</h2>
            </div>
            <CategoryFilter
              categories={CATEGORIES}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <div className="summary" aria-label="Expense summary">
            <div>
              <span className="summary-label">Showing</span>
              <p role="status" aria-label="Visible expense count" data-cy="count">
                {visibleExpenses.length} {visibleExpenses.length === 1 ? 'expense' : 'expenses'}
              </p>
            </div>
            <div className="summary-total">
              <span className="summary-label">Total</span>
              <p role="status" aria-label="Visible total" data-cy="total">
                {formatCurrency(total)}
              </p>
            </div>
          </div>

          <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
        </section>
      </section>
    </main>
  );
}

export default App;
