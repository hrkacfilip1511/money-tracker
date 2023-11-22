import { Fragment, useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import useStore from "../store/useStore";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
export default function Home(props) {
  const setCategories = useStore((state) => state.setCategories);
  const setSession = useStore((state) => state.setSession);
  useEffect(() => {
    setSession(props.session);
    const fetchCategories = async () => {
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
      <Dashboard />
    </Fragment>
  );
}
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
