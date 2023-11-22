import { Fragment } from "react";
import ComingSoon from "../../components/UI/ComingSoon/ComingSoon";
import Head from "next/head";

const Help = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Help</title>
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
export default Help;
