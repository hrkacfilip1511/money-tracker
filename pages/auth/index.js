import { useRouter } from "next/router";
import Auth from "../../components/Auth/Auth";
import { Fragment } from "react";
import Head from "next/head";

const Authentication = (props) => {
  const router = useRouter();
  const signupHandler = async (userData) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      router.reload();
    }
    const data = await response.json();
  };
  return (
    <Fragment>
      <Head>
        <title>Auth</title>
      </Head>
      <Auth onSignUp={signupHandler} />
    </Fragment>
  );
};

export default Authentication;
