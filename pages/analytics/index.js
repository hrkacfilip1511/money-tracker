import { Fragment } from "react";
import Head from "next/head";
import AnalyticsExpenses from "../../components/Analytics/Analytics";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
const Analytics = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Analytics</title>
      </Head>
      <AnalyticsExpenses session={props.session} />
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
export default Analytics;
