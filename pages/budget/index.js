import { Fragment } from "react";
import ChangeBudgetForm from "../../components/ChangeBudgetForm/ChangeBudgetForm";
import Head from "next/head";
import { getSession } from "next-auth/react";

const Budget = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Budget</title>
      </Head>
      <ChangeBudgetForm session={props.session} />
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
export default Budget;
