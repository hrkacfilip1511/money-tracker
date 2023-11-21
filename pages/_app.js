import { Fragment } from "react";
import Layout from "../components/UI/Layout/Layout";
import "../styles/globals.css";
import { SessionProvider, getSession } from "next-auth/react";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/transactions.png"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Fragment>
  );
}

export default MyApp;
