import { formatCurrency } from '../expenseUtils.js';

// Props supply one expense and its delete handler; this display component has no local state.
function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item" data-cy="expense-item">
      <div className="expense-details">
        <span className="expense-title">{expense.title}</span>
        <span className="expense-category">{expense.category}</span>
      </div>
      <span className="expense-amount">{formatCurrency(expense.amount)}</span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${expense.title}`}
        data-cy="delete-expense"
        onClick={() => onDelete(expense.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default ExpenseItem;
