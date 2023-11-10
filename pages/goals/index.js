import { Fragment } from "react";
import ComingSoon from "../../components/UI/ComingSoon/ComingSoon";
import Head from "next/head";

const Goals = () => {
  return (
    <Fragment>
      <Head>
        <title>Goals</title>
      </Head>
      <ComingSoon />{" "}
    </Fragment>
  );
};

export default Goals;
