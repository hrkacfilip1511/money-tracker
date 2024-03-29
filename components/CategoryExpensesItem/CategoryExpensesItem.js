import Image from "next/image";
import classes from "./CategoryExpensesItem.module.css";

const CategoryExpensesItem = ({
  imageName,
  categoryName,
  categoryAmount,
  percentage,
  clicked,
}) => {
  return (
    <div
      className={classes.categoryExpense}
      onClick={() => clicked(categoryName)}
    >
      <div className={classes.categoryImage}>
        <Image
          src={`/assets/categories/${imageName}`}
          alt={categoryName}
          width={40}
          height={40}
        />
      </div>
      <div className={classes.details}>
        <span
          className={`${classes.title} ${
            categoryName.length > 13 ? classes.bigName : ""
          }`}
        >
          {categoryName}
        </span>
        <span className={classes.amount}>
          <span className={classes.moneyType}>KM</span> {categoryAmount}
        </span>
      </div>
      <div className={classes.expenseBgPct}>
        <div
          className={classes.bgPct}
          style={{
            width: `${percentage}%`,
            fontSize: `${percentage < 5 ? "0.7rem" : "1rem"}`,
            borderRadius: `${percentage < 10 ? "2px" : "10px"}`,
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default CategoryExpensesItem;
