import MainNavigation from "../../MainNavigation/MainNavigation";
import useStore from "../../../store/useStore";
const Layout = (props) => {
  const version = require("../../../package.json").version;
  const session = useStore((state) => state.session);

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
