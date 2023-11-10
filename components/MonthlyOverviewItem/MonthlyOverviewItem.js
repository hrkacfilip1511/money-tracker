import Image from "next/image";
import classes from "./MonthlyOverviewItem.module.css";
import useStore from "../../store/useStore";

const MonthlyOverviewItem = ({ imageName, title, value, className }) => {
  let css = className;
  const isMobile = useStore((state) => state.isMobile);
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
        width={isMobile ? 20 : 40}
        height={isMobile ? 20 : 40}
        alt={title}
      />
      <div className={classes.overviewItemInfo}>
        <span className={classes.title}>{title}</span>
        <span className={classes.value}>
          <span className={classes.valueType}>KM</span>
          <span
            className={` ${
              className === "balance" && parseFloat(value) < 0
                ? classes.negativeValue
                : ""
            }`}
          >
            {value}
          </span>
        </span>
      </div>
    </div>
  );
};

export default MonthlyOverviewItem;
