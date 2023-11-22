import Head from "next/head";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import { Fragment } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const AddExpense = (props) => {
  return (
    <Fragment>
      <Head>
        <title>New Expense</title>
      </Head>
      <ExpenseForm session={props.session} />
    </Fragment>
  );
};
export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        session: session,
      },
    };
  }
};
export default AddExpense;
