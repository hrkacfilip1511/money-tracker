import Auth from "../../components/Auth/Auth";
import { Fragment, useState } from "react";
import Head from "next/head";
import { getSession } from "next-auth/react";
const version = require("../../package.json").version;

const Authentication = (props) => {
  console.log("auth props", props);

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
        <title>{version}</title>
      </Head>
      <Auth
        onSignUp={signupHandler}
        isLoading={isLoading}
        errorMsg={errorMsg}
      />
    </Fragment>
  );
};

// export const getServerSideProps = async ({ req }) => {
//   const session = await getSession({ req });

//   console.log("getserver auth =>>>>>", session);
//   if (!session) {
//     return {
//       props: {
//         session,
//       },
//     };
//   }
//   return {
//     redirect: {
//       destination: "/",
//       permanent: false,
//     },
//   };
// };
export default Authentication;
