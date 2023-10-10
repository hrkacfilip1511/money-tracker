import MainNavigation from "../../MainNavigation/MainNavigation";
import { useSession } from "next-auth/react";

const Layout = (props) => {
  const { data: session, status } = useSession();
  return (
    <div>
      {session && <MainNavigation sessionName={session.user.name} />}
      {props.children}
    </div>
  );
};
export default Layout;
