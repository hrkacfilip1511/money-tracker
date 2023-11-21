import Head from "next/head";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import { Fragment } from "react";
import { getSession } from "next-auth/react";

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
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
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
        session,
      },
    };
  }
};
export default AddExpense;
