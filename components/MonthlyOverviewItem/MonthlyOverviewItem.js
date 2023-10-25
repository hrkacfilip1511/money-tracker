import Image from "next/image";
import classes from "./MonthlyOverviewItem.module.css";

const MonthlyOverviewItem = ({ imageName, title, value, className }) => {
  let css = className;
  const getAditionedClassname = () => {
    switch (className) {
      case "income":
        return classes.income;
        break;
      case "expense":
        return classes.expense;
        break;
      default:
        return classes.balance;
    }
  };
  return (
    <div className={`${classes.overviewItem} ${getAditionedClassname()}`}>
      <Image
        src={`/assets/icons/${imageName}`}
        width={40}
        height={40}
        alt={title}
      />
      <div className={classes.overviewItemInfo}>
        <span>{title}</span>
        <span>KM {value}</span>
      </div>
    </div>
  );
};

export default MonthlyOverviewItem;
