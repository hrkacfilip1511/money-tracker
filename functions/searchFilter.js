const searchFilter = (searchTerm, expenses) => {
  let query = searchTerm.toLowerCase();
  if (query.length === 0) {
    return [];
  }
  const filteredExpenses = expenses.filter((expense) => {
    return (
      expense.title.toLowerCase().includes(query) ||
      expense.category.toLowerCase().includes(query) ||
      expense.paymentMethod.toLowerCase().includes(query)
    );
  });
  if (filteredExpenses.length > 0) {
    return filteredExpenses;
  } else {
    return [];
  }
};

export default searchFilter;
