import { Fragment } from "react";
import Head from "next/head";
import AnalyticsExpenses from "../../components/Analytics/Analytics";
const Analytics = () => {
  return (
    <Fragment>
      <Head>
        <title>Analytics</title>
      </Head>
      <AnalyticsExpenses />
    </Fragment>
  );
};

export default Analytics;
