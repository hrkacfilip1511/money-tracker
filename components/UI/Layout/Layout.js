import MainNavigation from "../../MainNavigation/MainNavigation";
import useStore from "../../../store/useStore";
const Layout = (props) => {
  const session = useStore((state) => state.session);
  const version = require("../../../package.json").version;
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
