import classes from "./Expenses.module.css";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
const Expenses = (props) => {
  return (
    <div className={classes.expenses}>
      {props.expenses.map((expense) => {
        return (
          <ExpenseItem
            key={expense.expenseId}
            amount={expense.amount}
            category={expense.category}
            date={expense.date}
            paymentMethod={expense.paymentMethod}
            quantity={expense.quantity}
            title={expense.title}
            id={expense.expenseId}
          />
        );
      })}
    </div>
  );
};

export default Expenses;
