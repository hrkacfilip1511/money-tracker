import { Fragment, useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import useStore from "../store/useStore";
import Head from "next/head";
import { getSession } from "next-auth/react";
export default function Home(props) {
  const setCategories = useStore((state) => state.setCategories);
  // console.log("rendered home", props);
  useEffect(() => {
    // console.log("Uslo");
    const fetchCategories = async () => {
      // console.log("Called");
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data?.length > 0) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);
  return (
    <Fragment>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard session={props.session} />
    </Fragment>
  );
}
export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("getserver home", session);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth",
  //       permanent: false,
  //     },
  //   };
  // }
  // else {
  return {
    props: {
      session: session,
    },
  };
  // }
};
