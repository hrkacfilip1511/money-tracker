import MonthlyOverviewItem from "../MonthlyOverviewItem/MonthlyOverviewItem";
import classes from "./ExpensesMainInfo.module.css";

const ExpensesMainInfo = ({ expenseAmount, userBudget, userBalance }) => {
  console.log(userBudget);
  return (
    <div className={classes.expensesMainInfo}>
      <MonthlyOverviewItem
        title={"Income"}
        imageName={"wallet.png"}
        value={userBudget}
        className={"income"}
      />
      <MonthlyOverviewItem
        title={"Expense"}
        imageName={"wallet.png"}
        value={expenseAmount}
        className={"expense"}
      />
      <MonthlyOverviewItem
        title={"Balance"}
        imageName={"balance.png"}
        value={userBalance.toFixed(2)}
        className={"balance"}
      />
    </div>
  );
};

export default ExpensesMainInfo;
