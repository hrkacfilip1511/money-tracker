import { useRouter } from "next/router";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { useSession } from "next-auth/react";
import useStore from "../../../store/useStore";

const Layout = (props) => {
  const { data: session, status } = useSession();
  const setSession = useStore((state) => state?.setSession);
  if (session) {
    setSession(session);
  }
  // else {
  //   router.push("/auth");
  // }
  return (
    <div>
      {session && <MainNavigation sessionName={session.user.name} />}
      {props.children}
    </div>
  );
};
export default Layout;
