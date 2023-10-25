import { useRouter } from "next/router";
import { useEffect } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import useStore from "../store/useStore";

export default function Home(props) {
  const setCategories = useStore((state) => state.setCategories);
  const router = useRouter();
  const session = useStore((state) => state.session);
  if (!session) {
    router.replace("/auth");
  }
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
    <div>
      <Dashboard />
    </div>
  );
}
