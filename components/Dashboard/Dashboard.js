import { useEffect, useState } from "react";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import Expenses from "../Expenses/Expenses";
import ExpensesMainInfo from "../ExpensesMainInfo/ExpensesMainInfo";
import classes from "./Dashboard.module.css";
import { useSession } from "next-auth/react";
const Dashboard = (props) => {
  const [expenses, setExpenses] = useState([]);
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const userBudget = session?.user?.image;
  const parsedBudget = parseFloat(userBudget)?.toFixed(2);
  const [date, setDate] = useState(new Date());
  const [expenseAmount, setExpenseAmount] = useState(0);
  const userBalance = parsedBudget - expenseAmount;
  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch(
        `/api/expenses/?email=${email}&date=${date}`
      );
      if (response.status === 201) {
        const data = await response.json();
        if (data) {
          setExpenses(data.expenses);
          let expenseAmt = data.expenses.reduce(
            (acc, currVal) => acc + currVal.amount,
            0
          );
          setExpenseAmount(expenseAmt?.toFixed(2));
        }
      }
    };
    if (session?.user?.email) {
      fetchExpenses();
    }
  }, [session?.user?.email, date]);
  return (
    <div className={classes.homepageContent}>
      <ExpensesMainInfo
        expenseAmount={expenseAmount}
        userBudget={parsedBudget}
        userBalance={userBalance}
      />
      <div>
        <ExpenseFilter
          date={date}
          expensesLength={expenses.length}
          setDate={setDate}
        />
        <Expenses expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;
