import ExpenseItem from './ExpenseItem.jsx';

// Props supply the currently visible expenses and delete handler; this component has no local state.
function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty-state">No expenses to show yet.</p>;
  }

  return (
    <ul className="expense-list" aria-label="Expenses">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ExpenseList;
