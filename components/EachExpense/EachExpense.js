import { useEffect, useState } from "react";
import classes from "./EachExpense.module.css";

const EachExpense = ({ expenseData }) => {
  console.log(expenseData);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data?.length > 0) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const categoryHandler = () => {};

  return (
    <div className={classes.itemContainer}>
      <form>
        <div className={classes.icon}></div>
        <div className={classes.title}>
          <input value={expenseData.title} />
        </div>
        <div className={classes.numbers}>
          <div className={classes.amount}>
            <label htmlFor="amount">Amount</label>
            <input id="amount" value={expenseData.amount} />
          </div>
          <div className={classes.quantity}>
            <label htmlFor="quantity">Quantity</label>
            <input id="quantity" value={expenseData.quantity} />
          </div>
        </div>
        <div className={classes.options}>
          <div className={classes.categories}>
            <select onChange={categoryHandler}>
              <option value="">Select category</option>
              {categories?.map((category) => {
                return (
                  <option key={category._id}>{category.categoryName}</option>
                );
              })}
            </select>
          </div>
          <div className={classes.date}>
            <input type="date" id="date" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EachExpense;
