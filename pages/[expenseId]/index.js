import { useRouter } from "next/router";
import { Fragment } from "react";
import EachExpense from "../../components/EachExpense/EachExpense";
import Head from "next/head";
import { fetchExpensesByEmail } from "../../lib/expense-data";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
const ExpenseItemById = ({ expenseData, session }) => {
  const route = useRouter();
  return (
    <Fragment>
      <Head>
        <title>Expense - {route.query.expenseId}</title>
      </Head>
      <EachExpense expenseData={expenseData} session={session} />
    </Fragment>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  const queryId = query;
  const expensesByEmail = await fetchExpensesByEmail(session?.user?.email);

  const filteredExpense = expensesByEmail.find(
    (expense) => expense.expenseId.toString() === queryId.expenseId
  );

  return {
    props: {
      session: session,
      expenseData: filteredExpense,
    },
  };
};

export default ExpenseItemById;
