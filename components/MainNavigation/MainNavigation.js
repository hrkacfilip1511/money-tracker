import Link from "next/link";
import classes from "./MainNavigation.module.css";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { CiSearch, CiUser, CiLogout } from "react-icons/ci";
import { GoGoal } from "react-icons/go";
import {
  MdOutlineSpaceDashboard,
  MdAttachMoney,
  MdOutlineAnalytics,
  MdOutlinePassword,
  MdHelpOutline,
  MdAddCircle,
} from "react-icons/md";
import { useRouter } from "next/router";
import useStore from "../../store/useStore";
const MainNavigation = (props) => {
  const [isProfilOptionOpened, setIsProfilOptionOpened] = useState(false);
  const [isSidebarShowed, setIsSidebarShowed] = useState(false);
  const router = useRouter();
  const setSearchVal = useStore((state) => state.setSearchVal);
  const setIsSearching = useStore((state) => state.setIsSearching);
  const searchValue = useStore((state) => state.searchVal);
  const setIsMobile = useStore((state) => state.setIsMobile);
  const isMobile = useStore((state) => state.isMobile);
  const signOutHandler = async () => {
    await signOut();
    window.location.href = "/";
  };
  const toggleSidebar = () => {
    setIsSidebarShowed((prevBool) => !prevBool);
  };

  const searchHandler = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    function checkDeviceType() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    }
    const isMobile = checkDeviceType();
    setIsMobile(isMobile);
  }, []);
  return (
    <div
      className={classes.barNavigation}
      style={{ zIndex: isSidebarShowed ? "5" : "0" }}
    >
      <div className={classes.mainAppHeading}>
        <h1 className={classes.appName}>PayTracker</h1>
        <h2>
          Welcome,<span className={classes.username}>{props.sessionName}</span>
        </h2>
        {isMobile && router.pathname !== "/" ? null : (
          <div className={classes.searchingTransaction}>
            {router.pathname === "/" && (
              <div className={classes.searchForm}>
                <CiSearch />
                <input
                  value={searchValue}
                  type="text"
                  placeholder="Search transactions"
                  onChange={searchHandler}
                  onFocus={() => setIsSearching(true)}
                  onBlur={() => {
                    setSearchVal("");
                    setIsSearching(false);
                  }}
                />
              </div>
            )}
          </div>
        )}
        {!isMobile && (
          <div className={classes.avatar}>
            <CiUser
              onClick={() => setIsProfilOptionOpened((prevBool) => !prevBool)}
            />
            {isProfilOptionOpened && (
              <div className={classes.profileOptions}>
                <span
                  className={classes.signOutOption}
                  onClick={signOutHandler}
                >
                  Sign out
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`${classes.sidebar} ${
          isSidebarShowed ? "" : classes.hideSidebar
        }`}
      >
        <div className={classes.navigation}>
          <Link href={"/"} className={classes.navLink}>
            <MdOutlineSpaceDashboard />
            <span>Dashboard</span>
          </Link>
          <Link href={"/budget"} className={classes.navLink}>
            <MdAttachMoney />
            <span>Budget</span>
          </Link>
          <Link href={"/analytics"} className={classes.navLink}>
            <MdOutlineAnalytics />
            <span>Analytics</span>
          </Link>
          <Link href={"/add-expense"} className={classes.navLink}>
            <MdAddCircle />
            <span>Add expense</span>
          </Link>
          <Link href={"/change-password"} className={classes.navLink}>
            <MdOutlinePassword />
            <span>Change password</span>
          </Link>
          <Link href={"/help"} className={classes.navLink}>
            <MdHelpOutline />
            <span>Help</span>
          </Link>
          <Link href={"/goals"} className={classes.navLink}>
            <GoGoal />
            <span>Goals</span>
          </Link>
          {isMobile && (
            <div onClick={signOutHandler} className={classes.navLink}>
              <CiLogout />
              <span>Logout</span>
            </div>
          )}
          <span className={classes.version}>v{props.version}</span>
        </div>
        <div
          className={`${classes.menuOption} ${
            isSidebarShowed ? classes.active : ""
          }`}
          onClick={toggleSidebar}
        >
          <div className={classes.menuBar}></div>
          <div className={classes.menuBar}></div>
          <div className={classes.menuBar}></div>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
