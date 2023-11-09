import { useRouter } from "next/router";
import classes from "./ExpenseFilter.module.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useState } from "react";
const ExpenseFilter = (props) => {
  const formattedDate = new Date(props.date).toLocaleString("hr-HR", {
    month: "long",
    year: "numeric",
  });
  const [buttonDisabledOptions, setButtonDisabledOptions] = useState({
    leftArrow: false,
    rightArror: true,
  });
  const router = useRouter();
  const goToNewExpense = () => {
    router.replace("/add-expense");
  };
  const nextMonthHandler = () => {
    const date = new Date(props.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    if (
      new Date(props.date).getMonth() === new Date().getMonth() &&
      year === new Date().getFullYear()
    ) {
      setButtonDisabledOptions({ leftArrow: false, rightArror: true });
      return;
    }
    setButtonDisabledOptions({ leftArrow: false, rightArror: false });

    let nextMonth, nextYear;

    if (month === 11) {
      nextMonth = 0;
      nextYear = year + 1;
    } else {
      nextMonth = month + 1;
      nextYear = year;
    }
    const nextMonthOrYear = new Date(nextYear, nextMonth, 1);
    props.setDate(nextMonthOrYear);
  };
  const previousMonthHandler = () => {
    const date = new Date(props.date);
    const month = date.getMonth();
    const year = date.getFullYear();

    if (month === new Date().getMonth() && year !== new Date().getFullYear()) {
      setButtonDisabledOptions({ leftArrow: true });
      return;
    }
    setButtonDisabledOptions({ leftArrow: false, rightArror: false });

    let prevMonth, prevYear;
    if (month === 0) {
      prevMonth = 11;
      prevYear = year - 1;
    } else {
      prevMonth = month - 1;
      prevYear = year;
    }
    const prevMonthOrYear = new Date(prevYear, prevMonth, 1);
    props.setDate(prevMonthOrYear);
  };
  const orderHandler = (e) => {
    if (e.target.value !== "Filter by") {
      props.setOrderBy(e.target.value);
    }
  };
  return (
    <div className={classes.filterBoard}>
      <div className={classes.findedExpenses}>
        <span className={classes.findedExpensesTitle}>Founded expenses</span>
        <span className={classes.findedExpensesValue}>
          {props.expensesLength}
        </span>
      </div>
      <div className={classes.expensesDate}>
        <div
          className={`${classes.arrow} ${
            buttonDisabledOptions.leftArrow ? classes.disabled : ""
          }`}
          onClick={previousMonthHandler}
        >
          <AiOutlineArrowLeft />
        </div>
        <span className={classes.dateVal}>{formattedDate}</span>
        <div
          className={`${classes.arrow} ${
            buttonDisabledOptions.rightArror ? classes.disabled : ""
          }`}
          onClick={nextMonthHandler}
        >
          <AiOutlineArrowRight />
        </div>
      </div>
      <div className={classes.filterByDate}>
        <select value={props.orderBy} onChange={orderHandler}>
          <option>Filter by</option>
          <option>Date</option>
          <option>Prize</option>
        </select>
      </div>
      <div className={classes.addExpenseBtn}>
        <span onClick={goToNewExpense}>+</span>
      </div>
    </div>
  );
};

export default ExpenseFilter;
