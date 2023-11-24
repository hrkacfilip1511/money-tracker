import { Fragment, useEffect } from "react";
import ComingSoon from "../../components/UI/ComingSoon/ComingSoon";
import Head from "next/head";
import useStore from "../../store/useStore";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Profile from "../../components/Profile/Profile";

const ChangePassword = (props) => {
  const setSession = useStore((state) => state.setSession);
  useEffect(() => {
    setSession(props.session);
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Password</title>
      </Head>
      <Profile session={props.session} />
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
export default ChangePassword;
