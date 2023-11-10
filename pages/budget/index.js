import { Fragment } from "react";
import ChangeBudgetForm from "../../components/ChangeBudgetForm/ChangeBudgetForm";
import Head from "next/head";

const Budget = () => {
  return (
    <Fragment>
      <Head>
        <title>Budget</title>
      </Head>
      <ChangeBudgetForm />
    </Fragment>
  );
};

export default Budget;
