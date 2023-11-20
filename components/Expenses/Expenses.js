import classes from "./Expenses.module.css";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import EmptyData from "../UI/EmptyData/EmptyData";
const Expenses = (props) => {
  return (
    <div className={classes.expenses}>
      {props.isLoading ? (
        <div className={classes.boxContainer}>
          <LoadingSpinner height={60} width={60} lineWidth={6} />
        </div>
      ) : props.expenses.length === 0 ? (
        <EmptyData message={"No expenses found"} imageName={"empty-expenses"} />
      ) : (
        props.expenses.map((expense) => {
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
        })
      )}
    </div>
  );
};

export default Expenses;
