import { useRouter } from "next/router";
import useStore from "../../store/useStore";
import { Fragment } from "react";
import EachExpense from "../../components/EachExpense/EachExpense";
import Head from "next/head";
import { fetchExpensesByEmail } from "../../lib/expense-data";
import { getSession } from "next-auth/react";
const ExpenseItemById = ({ expenseData }) => {
  const route = useRouter();

  return (
    <Fragment>
      <Head>
        <title>Expense - {route.query.expenseId}</title>
      </Head>
      <EachExpense expenseData={expenseData} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  const query = context.query;
  const expensesByEmail = await fetchExpensesByEmail(session?.user?.email);

  const filteredExpense = expensesByEmail.find(
    (expense) => expense.expenseId.toString() === query.expenseId
  );

  console.log(filteredExpense);

  return {
    props: {
      expenseData: filteredExpense,
    },
  };
};
export default ExpenseItemById;
