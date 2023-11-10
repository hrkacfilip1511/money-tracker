import Head from "next/head";
import ExpenseForm from "../../components/ExpenseForm/ExpenseForm";
import { Fragment } from "react";

const AddExpense = () => {
  return (
    <Fragment>
      <Head>
        <title>New Expense</title>
      </Head>
      <ExpenseForm />
    </Fragment>
  );
};

export default AddExpense;
