import Image from "next/image";
import classes from "./DailyExpensesInfo.module.css";

const DailyExpensesInfo = ({ date, totalExpenses }) => {
  const toDate = new Date(date);
  let sentenceForExpense,
    dailyExpenseValue = 0;
  const formattedDate = toDate.toLocaleString("en-GB", {
    month: "long",
  });
  if (
    toDate.getMonth() === new Date().getMonth() &&
    toDate.getFullYear() === new Date().getFullYear()
  ) {
    const now = new Date();
    sentenceForExpense = `Your daily spending for ${formattedDate} is: `;
    dailyExpenseValue = parseFloat(totalExpenses) / now.getDate();
  } else {
    sentenceForExpense = `Your daily spending for ${formattedDate} was: `;
    const dateForManipulation = new Date(toDate);
    const lastDateOfMonth = new Date(
      toDate.getFullYear(),
      toDate.getMonth() + 1,
      0
    );
    dailyExpenseValue = parseFloat(totalExpenses) / lastDateOfMonth.getDate();
  }
  return (
    <div className={classes.dailyContainer}>
      <Image
        src={"/assets/icons/daily.png"}
        width={30}
        height={30}
        alt="daily-img"
      />
      <span className={classes.sentence}>{sentenceForExpense}</span>
      <span className={classes.value}>{dailyExpenseValue.toFixed(2)} KM</span>
    </div>
  );
};

export default DailyExpensesInfo;
