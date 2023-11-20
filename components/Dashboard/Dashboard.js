import { useEffect, useState } from "react";
import ExpenseFilter from "../ExpenseFilter/ExpenseFilter";
import Expenses from "../Expenses/Expenses";
import ExpensesMainInfo from "../ExpensesMainInfo/ExpensesMainInfo";
import classes from "./Dashboard.module.css";
import Payments from "../PaymentCategories/PaymentCategories";
import CategoriesExpenses from "../CategoriesExpenses/CategoriesExpenses";
import useStore from "../../store/useStore";
import searchFilter from "../../functions/searchFilter";
import Modal from "../UI/Modal/Modal";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import DailyExpensesInfo from "../DailyExpensesInfo/DailyExpensesInfo";
const Dashboard = (props) => {
  const [expenses, setExpenses] = useState([]);
  const session = useStore((state) => state.session);
  const email = session?.user?.email;
  const userBudget = session?.user?.image;
  const parsedBudget = parseFloat(userBudget)?.toFixed(2);
  const [date, setDate] = useState(new Date());
  const [expenseAmount, setExpenseAmount] = useState(0);
  const userBalance = parsedBudget - expenseAmount;
  const [orderBy, setOrderBy] = useState("");
  const searchVal = useStore((state) => state.searchVal);
  const [searchFilteredExpenses, setSearchFilteredExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cachedExpenses, setCachedExpenses] = useState({});
  const [isModalOpen, setIsModalOpen] = useState({
    modalBool: false,
    modalTitle: "",
    modalContent: [],
  });
  useEffect(() => {
    const filtered = searchFilter(searchVal, expenses);
    setSearchFilteredExpenses(filtered);
  }, [searchVal]);

  useEffect(() => {
    const toDateVal = new Date(date);
    setExpenses([]);
    const cachedKey = `${toDateVal.getMonth() + 1}-${toDateVal.getFullYear()}`;
    const fetchExpenses = async () => {
      setIsLoading(true);
      const response = await fetch(
        `/api/expenses/?email=${email}&date=${date}`
      );
      if (response.status === 201) {
        const data = await response.json();
        if (data) {
          setExpenses(data.expenses);
          let expenseAmt = data.expenses.reduce(
            (acc, currVal) => acc + currVal.amount,
            0
          );
          setExpenseAmount(expenseAmt?.toFixed(2));
          setCachedExpenses({ ...cachedExpenses, [cachedKey]: data.expenses });
        }
      }
      setIsLoading(false);
    };

    if (session?.user?.email) {
      if (!cachedExpenses[cachedKey]) {
        fetchExpenses();
      } else {
        let expenseAmt = cachedExpenses[cachedKey].reduce(
          (acc, currVal) => acc + currVal.amount,
          0
        );
        setExpenseAmount(expenseAmt?.toFixed(2));
        setExpenses(cachedExpenses[cachedKey]);
      }
    }
  }, [session?.user?.email, date]);
  useEffect(() => {
    let filteredExpenses = expenses.slice();
    if (orderBy === "Date") {
      filteredExpenses = filteredExpenses?.sort(
        (a, b) => new Date(b.date).getDate() - new Date(a.date).getDate()
      );
      setExpenses(filteredExpenses);
    }
    if (orderBy === "Prize") {
      filteredExpenses = filteredExpenses?.sort((a, b) => b.amount - a.amount);
      setExpenses(filteredExpenses);
    }
  }, [orderBy]);
  const clickedClose = () => {
    setIsModalOpen({ modalBool: false, modalTitle: "", modalContent: [] });
  };
  if (isModalOpen.modalBool) {
    let expenseAmt = isModalOpen.modalContent.reduce(
      (acc, currVal) => acc + currVal.amount,
      0
    );
    return (
      <Modal clicked={clickedClose}>
        <h3 className={classes.modalTitle}>{isModalOpen.modalTitle}</h3>
        {isModalOpen.modalContent?.map((expense) => {
          return (
            <ExpenseItem
              key={expense.expenseId}
              amount={expense.amount}
              category={expense.category}
              date={expense.date}
              paymentMethod={expense.paymentMethod}
              quantity={expense.quantity}
              title={expense.title}
              id={expense.expenseId}
            />
          );
        })}
        <div className={classes.totalExpense}>
          <span className={classes.totalExpenseTitle}>Total</span>
          <span className={classes.totalExpenseValue}>{expenseAmt} KM</span>
        </div>
      </Modal>
    );
  }
  return (
    <div className={classes.homepageContent}>
      <ExpensesMainInfo
        expenseAmount={expenseAmount}
        userBudget={parsedBudget}
        userBalance={userBalance}
      />
      <DailyExpensesInfo date={date} totalExpenses={expenseAmount} />

      <div className={classes.expensesMoreDetails}>
        <div>
          <ExpenseFilter
            date={date}
            expensesLength={
              searchFilteredExpenses.length > 0
                ? searchFilteredExpenses.length
                : expenses.length
            }
            setDate={setDate}
            setOrderBy={setOrderBy}
            orderBy={orderBy}
          />
          <Expenses
            isLoading={isLoading}
            expenses={
              searchFilteredExpenses.length > 0
                ? searchFilteredExpenses
                : expenses
            }
          />
        </div>
        <Payments expenses={expenses} setIsModalOpen={setIsModalOpen} />
      </div>
      {expenses?.length > 0 && (
        <CategoriesExpenses
          expenses={expenses}
          expenseAmount={expenseAmount}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default Dashboard;
