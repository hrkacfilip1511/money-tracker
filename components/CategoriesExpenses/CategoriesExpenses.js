import CategoryExpensesItem from "../CategoryExpensesItem/CategoryExpensesItem";
import classes from "./CategoriesExpenses.module.css";
import useStore from "../../store/useStore";
const CategoriesExpenses = ({ expenses, expenseAmount }) => {
  const categories = useStore((state) => state.categories);
  let expensesByCategories = [];

  categories.forEach((category) => {
    let filteredExpenses = expenses.filter(
      (expense) => expense.category === category.categoryName
    );
    if (filteredExpenses.length > 0) {
      const sumOfFilteredExpense = filteredExpenses.reduce(
        (acc, currVal) => acc + currVal.amount,
        0
      );
      expensesByCategories = [
        ...expensesByCategories,
        {
          id: category.id,
          categoryName: category.categoryName,
          amount: sumOfFilteredExpense,
          imageName: category.categoryImage,
          expensePercentage: Math.round(
            (sumOfFilteredExpense / expenseAmount) * 100
          ),
        },
      ];
    }
  });
  return (
    <div className={classes.categoriesExpenses}>
      <h2 className={classes.title}>Expenses by categories</h2>
      {expensesByCategories.length > 0 &&
        expensesByCategories
          .sort((a, b) => b.amount - a.amount)
          .map((expense) => {
            return (
              <>
                <CategoryExpensesItem
                  key={expense.id}
                  imageName={expense.imageName}
                  categoryName={expense.categoryName}
                  categoryAmount={expense.amount}
                  percentage={expense.expensePercentage}
                />
              </>
            );
          })}
    </div>
  );
};

export default CategoriesExpenses;
