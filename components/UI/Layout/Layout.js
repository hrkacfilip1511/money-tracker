import { useEffect } from "react";
import useStore from "../../../store/useStore";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Layout = (props) => {
  const { data: session, status } = useSession();
  const setSession = useStore((state) => state.setSession);
  const router = useRouter();
  useEffect(() => {
    if (session?.user) {
      setSession(session);
    } else {
      router.replace("/auth");
    }
  }, [session?.user?.email]);
  return (
    <div>
      {session && <MainNavigation sessionName={session.user.name} />}
      {props.children}
    </div>
  );
};
export default Layout;
