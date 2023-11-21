import { Fragment } from "react";
import Head from "next/head";
import AnalyticsExpenses from "../../components/Analytics/Analytics";
import { getSession } from "next-auth/react";
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
export default Analytics;
