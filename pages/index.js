import { Fragment, useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import useStore from "../store/useStore";
import Head from "next/head";

export default function Home(props) {
  const setCategories = useStore((state) => state.setCategories);
  useEffect(() => {
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
