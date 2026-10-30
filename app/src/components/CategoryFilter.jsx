// Props supply the available categories, current selection, and change handler; this component has no local state.
function CategoryFilter({ categories, value, onChange }) {
  return (
    <label className="filter-field">
      <span>Filter by category</span>
      <select
        data-cy="filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="All">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </label>
  );
}

export default CategoryFilter;
