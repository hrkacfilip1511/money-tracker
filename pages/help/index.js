import { Fragment, useEffect } from "react";
import ComingSoon from "../../components/UI/ComingSoon/ComingSoon";
import Head from "next/head";
import { getSession } from "next-auth/react";
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
export default Help;
