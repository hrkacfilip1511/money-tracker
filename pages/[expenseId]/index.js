import { useRouter } from "next/router";
import useStore from "../../store/useStore";
import { useEffect, useState } from "react";
import EachExpense from "../../components/EachExpense/EachExpense";

const ExpenseItemById = () => {
  const session = useStore((state) => state.session);
  const [expenseData, setExpenseData] = useState({});
  const route = useRouter();

  useEffect(() => {
    const fetchExpenseItem = async () => {
      const data = {
        email: session.user.email,
        expenseId: route.query.expenseId,
      };
      const response = await fetch("/api/expense-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (resData) {
        setExpenseData(resData.expense);
      }
    };
    if (session?.user) {
      fetchExpenseItem();
    }
  }, [session?.user?.email]);
  return !expenseData?.title ? (
    <h1>Loading...</h1>
  ) : (
    <div>
      <EachExpense expenseData={expenseData} />
    </div>
  );
};

export default ExpenseItemById;
