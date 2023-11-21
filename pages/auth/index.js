import Auth from "../../components/Auth/Auth";
import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
const version = require("../../package.json").version;

const Authentication = (props) => {
  console.log("auth props", props);
  const router = useRouter();
  useEffect(() => {
    console.log("auth props UE", props);
    if (props.session && props.session.user) {
      router.replace("/");
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const signupHandler = async (userData) => {
    setIsLoading(true);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    if (response.status === 200) {
      setErrorMsg("");
      window.location.href = "/auth";
    } else {
      const data = await response.json();
      setErrorMsg(data.message);
    }
  };
  return (
    <Fragment>
      <Head>
        <title>Auth - {version}</title>
      </Head>
      <Auth
        onSignUp={signupHandler}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </Fragment>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("getserver auth", session);

  return {
    props: {
      session: session,
    },
  };
};
export default Authentication;
