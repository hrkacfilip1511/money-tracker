import CategoryExpensesItem from "../CategoryExpensesItem/CategoryExpensesItem";
import classes from "./CategoriesExpenses.module.css";
import useStore from "../../store/useStore";
import { Fragment, useEffect, useRef, useState } from "react";
const CategoriesExpenses = ({ expenses, expenseAmount, setIsModalOpen }) => {
  const categories = useStore((state) => state.categories);

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     let scrollVal = window.scrollY + window.innerHeight;
  //     const percentage = parseInt(
  //       (scrollVal / document.documentElement.scrollHeight) * 100
  //     );

  //     if (percentage >= 92) {
  //       setIsVisible(true);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("scroll", null);
  //   };
  // }, []);
  useEffect(() => {
    const options = {
      threshold: 0.2, // Trigger when 20% of the target is visible
    };

    // Callback function to handle intersection changes
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("At least 20% of the target div is visible");
          setIsVisible(true);
          // Add your custom logic here
        } else {
          // Add your custom logic here
        }
      });
    };

    // Create an intersection observer with the callback and options
    const observer = new IntersectionObserver(handleIntersection, options);

    // Target element to observe

    // Start observing the target element
    observer.observe(containerRef.current);
  }, []);

  let expensesByCategories = [];

  const clickedCategory = (catName) => {
    const expensesByCategory = expenses.filter(
      (expense) => expense.category === catName
    );
    setIsModalOpen({
      modalBool: true,
      modalTitle: `${catName} expenses`,
      modalContent: expensesByCategory,
    });
  };
  categories.forEach((category) => {
    let filteredExpenses = expenses.filter(
      (expense) => expense.category === category.categoryName
    );

    if (filteredExpenses.length > 0) {
      const sumOfFilteredExpense = filteredExpenses.reduce(
        (acc, currVal) => acc + currVal.amount,
        0
      );
      expensesByCategories = [
        ...expensesByCategories,
        {
          id: category._id,
          categoryName: category.categoryName,
          amount: sumOfFilteredExpense,
          imageName: category.categoryImage,
          expensePercentage: Math.round(
            (sumOfFilteredExpense / expenseAmount) * 100
          ),
        },
      ];
    }
  });
  return (
    <div
      className={`${classes.categoriesExpenses} ${
        isVisible ? classes.show : ""
      }`}
      ref={containerRef}
    >
      <h2 className={classes.title}>Expenses by categories</h2>
      {expensesByCategories.length > 0 &&
        expensesByCategories
          .sort((a, b) => b.amount - a.amount)
          .map((expense) => {
            return (
              <Fragment key={expense.id}>
                <CategoryExpensesItem
                  imageName={expense.imageName}
                  categoryName={expense.categoryName}
                  categoryAmount={expense.amount}
                  percentage={expense.expensePercentage}
                  clicked={clickedCategory}
                />
              </Fragment>
            );
          })}
    </div>
  );
};

export default CategoriesExpenses;
