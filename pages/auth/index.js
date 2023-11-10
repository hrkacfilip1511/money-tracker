import { useRouter } from "next/router";
import Auth from "../../components/Auth/Auth";
import { Fragment, useState } from "react";
import Head from "next/head";

const Authentication = (props) => {
  const router = useRouter();
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
        <title>Auth</title>
      </Head>
      <Auth
        onSignUp={signupHandler}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </Fragment>
  );
};

export default Authentication;
