import { Fragment, useEffect } from "react";
import ComingSoon from "../../components/UI/ComingSoon/ComingSoon";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import useStore from "../../store/useStore";

const Help = (props) => {
  const setSession = useStore((state) => state.setSession);

  useEffect(() => {
    setSession(props.session);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Help</title>
      </Head>
      <ComingSoon />
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
export default Help;
