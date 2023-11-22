import { Fragment } from "react";
import ComingSoon from "../../components/UI/ComingSoon/ComingSoon";
import Head from "next/head";

const ChangePassword = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Password</title>
      </Head>
      <ComingSoon />
    </Fragment>
  );
};
// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   } else {
//     return {
//       props: {
//         session,
//       },
//     };
//   }
// };
export default ChangePassword;
