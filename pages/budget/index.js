import { Fragment } from "react";
import ChangeBudgetForm from "../../components/ChangeBudgetForm/ChangeBudgetForm";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

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
export default Budget;
