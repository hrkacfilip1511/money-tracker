import { useEffect, useRef, useState } from "react";
import { backgroundColorArray, borderColorArray } from "../../lib/chart-bgs";
import BarChart from "../BarChart/BarChart";
import classes from "./CurrentMonthChart.module.css";
const CurrentMonthChart = ({ expenses, date }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // useEffect(() => {
  //   const options = {
  //     threshold: 0.2,
  //   };

  //   const handleIntersection = (entries, observer) => {
  //     entries.forEach((entry) => {
  //       if (entry.isIntersecting) {
  //         setIsVisible(true);
  //       }
  //     });
  //   };

  //   const observer = new IntersectionObserver(handleIntersection, options);

  //   observer.observe(containerRef.current);
  // }, []);

  const toDate = new Date(date);
  const filteredExpensesByCurrMonth = expenses.filter(
    (expense) => new Date(expense.date).getMonth() === toDate.getMonth()
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
  const formattedMonth = toDate.toLocaleString("en-GB", { month: "long" });
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
    <div
      className={`${classes.currentMonthChart} ${
        isVisible ? classes.show : ""
      }`}
      ref={containerRef}
    >
      {thisMonthChartsData && thisMonthChartsData.labels ? (
        <BarChart chartData={thisMonthChartsData} />
      ) : null}
    </div>
  );
};

export default CurrentMonthChart;
