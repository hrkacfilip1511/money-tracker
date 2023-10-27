import Image from "next/image";
import classes from "./ExpenseItem.module.css";
import Link from "next/link";

const ExpenseItem = (props) => {
  const { amount, category, date, paymentMethod, quantity, title, id } = props;
  const formattedDate = new Date(date).toLocaleString("hr-HR", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Link href={`${id}`}>
      <div className={classes.expenseItem}>
        <div className={classes.expenseImage}>
          <Image
            src={"/assets/icons/transactions.png"}
            alt={title}
            width={40}
            height={40}
          />
        </div>
        <div className={classes.expenseInfo}>
          <span className={classes.expenseTitle}>{title}</span>
          <span className={classes.expenseDate}>{formattedDate}</span>
        </div>
        <div className={classes.expenseInfoNumbers}>
          <span className={classes.expenseAmountType}>
            KM <span className={classes.expenseAmount}> {amount}</span>
          </span>
          <span className={classes.expenseQuantity}>x{quantity}</span>
        </div>
      </div>
    </Link>
  );
};

export default ExpenseItem;
