import { useEffect, useState } from "react";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import Expenses from "../Expenses/Expenses";
import ExpensesMainInfo from "../ExpensesMainInfo/ExpensesMainInfo";
import classes from "./Dashboard.module.css";
import { useSession } from "next-auth/react";
import Payments from "../PaymentCategories/PaymentCategories";
const Dashboard = (props) => {
  const [expenses, setExpenses] = useState([]);
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const userBudget = session?.user?.image;
  const parsedBudget = parseFloat(userBudget)?.toFixed(2);
  const [date, setDate] = useState(new Date());
  const [expenseAmount, setExpenseAmount] = useState(0);
  const userBalance = parsedBudget - expenseAmount;
  const [orderBy, setOrderBy] = useState("");
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
  useEffect(() => {
    let filteredExpenses = expenses.slice();
    if (orderBy === "Date") {
      filteredExpenses = filteredExpenses?.sort(
        (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate()
      );
      setExpenses(filteredExpenses);
    }
    if (orderBy === "Prize") {
      filteredExpenses = filteredExpenses?.sort((a, b) => b.amount - a.amount);
      setExpenses(filteredExpenses);
    }
  }, [orderBy]);
  return (
    <div className={classes.homepageContent}>
      <ExpensesMainInfo
        expenseAmount={expenseAmount}
        userBudget={parsedBudget}
        userBalance={userBalance}
      />
      <div className={classes.expensesMoreDetails}>
        <div>
          <ExpenseFilter
            date={date}
            expensesLength={expenses.length}
            setDate={setDate}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          />
          <Expenses expenses={expenses} />
        </div>
        <Payments expenses={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;
