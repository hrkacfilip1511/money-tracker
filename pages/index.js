import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import useStore from "../store/useStore";

export default function Home(props) {
  const setCategories = useStore((state) => state.setCategories);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
      }
    });
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
    <div>
      <Dashboard />
    </div>
  );
}
