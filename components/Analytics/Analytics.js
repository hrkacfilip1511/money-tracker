import { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import { fetchExpensesByEmail } from "../../lib/expense-data";
import classes from "./Analytics.module.css";
import { backgroundColorArray, borderColorArray } from "../../lib/chart-bgs";
import BarChart from "../BarChart/BarChart";
const AnalyticsExpenses = ({ session }) => {
  const setSession = useStore((state) => state.setSession);
  const [allExpenses, setAllExpenses] = useState([]);
  useEffect(() => {
    setSession(session);
    const fetchExpenses = async () => {
      const data = await fetchExpensesByEmail(session.user.email);
      setAllExpenses(data);
    };
    if (session?.user) {
      fetchExpenses();
    }
  }, []);

  // Podaci za grafikon po mjesecu

  let expandedExpenses = allExpenses?.map((expense) => {
    return {
      ...expense,
      monthString: new Date(expense.date).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      }),
    };
  });
  const expenseSet = new Set();
  expandedExpenses.forEach((data) => {
    expenseSet.add(data.monthString);
  });
  let finnallyExpenses = [];

  expenseSet.forEach((set) => {
    const filteredExpenses = expandedExpenses.filter(
      (expense) => expense.monthString === set
    );
    let expenseAmt = filteredExpenses.reduce(
      (acc, currVal) => acc + currVal.amount,
      0
    );
    finnallyExpenses.push({ date: set, expensesAmt: expenseAmt });
  });
  let monthlyChartsData = {};

  if (finnallyExpenses.length > 0) {
    monthlyChartsData = {
      labels: finnallyExpenses?.map((expense) => expense.date),
      datasets: [
        {
          label: "Monthly expenses",
          data: finnallyExpenses?.map((expense) => expense.expensesAmt),
          backgroundColor: backgroundColorArray.slice(
            0,
            finnallyExpenses.length
          ),
          borderColor: borderColorArray.slice(0, finnallyExpenses.length),
          borderWidth: 1,
        },
      ],
    };
  }

  // Podaci za grafikon samo za trenutni mjesec

  const now = new Date();
  const filteredExpensesByCurrMonth = allExpenses.filter(
    (expense) => new Date(expense.date).getMonth() === now.getMonth()
  );

  const categorySet = new Set();

  filteredExpensesByCurrMonth.forEach((expense) => {
    categorySet.add(expense.category);
  });

  let finallyExpensesByCategory = [];

  categorySet.forEach((category) => {
    const filteredExpensesByCategory = filteredExpensesByCurrMonth.filter(
      (expense) => expense.category === category
    );
    let expenseAmt = filteredExpensesByCategory.reduce(
      (acc, currVal) => acc + currVal.amount,
      0
    );
    finallyExpensesByCategory.push({
      category: category,
      expenseAmt: expenseAmt,
    });
  });

  let thisMonthChartsData = {};
  const formattedMonth = now.toLocaleString("en-GB", { month: "long" });
  if (finallyExpensesByCategory.length > 0) {
    thisMonthChartsData = {
      labels: finallyExpensesByCategory.map((expense) => expense.category),
      datasets: [
        {
          label: `${formattedMonth} expenses`,
          data: finallyExpensesByCategory.map((expense) => expense.expenseAmt),
          backgroundColor: backgroundColorArray.slice(
            0,
            finallyExpensesByCategory.length
          ),
          borderColor: borderColorArray.slice(
            0,
            finallyExpensesByCategory.length
          ),
          borderWidth: 1,
        },
      ],
    };
  }

  return (
    <div className={classes.charts}>
      {monthlyChartsData && monthlyChartsData.labels ? (
        <BarChart chartData={monthlyChartsData} />
      ) : null}
      {thisMonthChartsData && thisMonthChartsData.labels ? (
        <div className={classes.thisMonthCharts}>
          <BarChart chartData={thisMonthChartsData} />
        </div>
      ) : null}
    </div>
  );
};

export default AnalyticsExpenses;
