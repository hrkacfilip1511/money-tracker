import { useRouter } from "next/router";
import useStore from "../../store/useStore";
import { Fragment } from "react";
import EachExpense from "../../components/EachExpense/EachExpense";
import Head from "next/head";
import { fetchExpensesByEmail } from "../../lib/expense-data";
import { getSession } from "next-auth/react";
const ExpenseItemById = ({ expenseData, session }) => {
  const route = useRouter();
  console.log(expenseData, session);
  return (
    <Fragment>
      <Head>
        <title>Expense - {route.query.expenseId}</title>
      </Head>
      <EachExpense expenseData={expenseData} session={session} />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth",
  //       permanent: false,
  //     },
  //   };
  // }
  const query = context.query;
  const expensesByEmail = await fetchExpensesByEmail(session?.user?.email);

  const filteredExpense = expensesByEmail.find(
    (expense) => expense.expenseId.toString() === query.expenseId
  );

  return {
    props: {
      session: session,
      expenseData: filteredExpense,
    },
  };
};
export default ExpenseItemById;
