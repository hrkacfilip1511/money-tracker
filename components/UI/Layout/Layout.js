import { useRouter } from "next/router";
import MainNavigation from "../../MainNavigation/MainNavigation";
import { useSession } from "next-auth/react";
import useStore from "../../../store/useStore";
import { useEffect, useState } from "react";
import classes from "./Layout.module.css";
const Layout = (props) => {
  const { data: session, status } = useSession();
  const setSession = useStore((state) => state?.setSession);
  const router = useRouter();
  const version = require("../../../package.json").version;
  const [isScrolledToTheBottom, setIsScrolledToTheBottom] = useState(false);
  useEffect(() => {
    if (session) {
      setSession(session);
    }

    if (session === null) {
      router.push("/auth");
    }
  }, [session]);

  useEffect(() => {
    window.onscroll = function () {
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight
      ) {
        setIsScrolledToTheBottom(true);
      } else {
        setIsScrolledToTheBottom(false);
      }
    };
  }, []);

  return (
    <div>
      {session && <MainNavigation sessionName={session.user.name} />}
      {props.children}
      <footer
        className={`${classes.footer} ${
          isScrolledToTheBottom ? classes.showFooter : ""
        }`}
      >
        <span className={classes.footerTxt}>
          PayTracker © All rights reserved
        </span>
        <span className={classes.version}>v{version}</span>
      </footer>
    </div>
  );
};
export default Layout;
