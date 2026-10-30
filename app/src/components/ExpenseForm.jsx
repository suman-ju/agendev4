import { CATEGORIES } from '../expenseUtils.js';

// Props provide the form values, change handlers, submit handler, and validation message; this component has no local state.
function ExpenseForm({
  title,
  amount,
  category,
  error,
  onTitleChange,
  onAmountChange,
  onCategoryChange,
  onSubmit,
}) {
  return (
    <form className="expense-form" onSubmit={onSubmit} noValidate>
      <div className="form-fields">
        <label className="field">
          <span>Title</span>
          <input
            data-cy="title"
            type="text"
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="e.g. Weekly groceries"
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span>Amount</span>
          <input
            data-cy="amount"
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(event) => onAmountChange(event.target.value)}
            placeholder="0.00"
            autoComplete="off"
          />
        </label>

        <label className="field">
          <span>Category</span>
          <select
            data-cy="category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}

      <button className="primary-button" data-cy="add-expense" type="submit">
        Add expense
      </button>
    </form>
  );
}

export default ExpenseForm;
