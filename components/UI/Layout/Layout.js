import { useRouter } from "next/router";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { useSession } from "next-auth/react";
import useStore from "../../../store/useStore";
import { useEffect, useState } from "react";
import classes from "./Layout.module.css";
const Layout = (props) => {
  const setSession = useStore((state) => state?.setSession);
  const router = useRouter();
  const version = require("../../../package.json").version;
  // const [isScrolledToTheBottom, setIsScrolledToTheBottom] = useState(false);
  const session = useStore((state) => state.session);
  console.log(session);

  useEffect(() => {
    // if (session) {
    //   setSession(session);
    // }
    // if (session === null || !session) {
    //   router.push("/auth");
    // }
  }, [session, router.route]);

  // useEffect(() => {
  //   window.onscroll = function () {
  //     if (
  //       window.scrollY + window.innerHeight >=
  //       document.documentElement.scrollHeight
  //     ) {
  //       setIsScrolledToTheBottom(true);
  //     } else {
  //       setIsScrolledToTheBottom(false);
  //     }
  //   };
  // }, []);

  return (
    <div>
      {session && (
        <MainNavigation sessionName={session.user.name} version={version} />
      )}
      {props.children}
    </div>
  );
};
export default Layout;
