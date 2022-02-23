import Head from 'next/head';
import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import 'macro-css';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../theme';
import Header from '../components/Header';
import { wrapper } from '../redux/store';
import { parseCookies } from 'nookies';
import { UserApi } from '../utils/api/user';
import { setUserData } from '../redux/slices/user';
import { Component } from 'react';
import { Api } from '../utils/api';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>TJ clone</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Component {...pageProps} />;
      </MuiThemeProvider>
    </>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }) => {
      try {
        const user = await Api(ctx).user.getMe();
        store.dispatch(setUserData(user));
      } catch (error) {
        if (ctx.asPath === '/write') {
          ctx.res?.writeHead(302, {
            location: '/403',
          });
          ctx.res?.end();
        }
        console.log(error);
      }

      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      };
    }
);

export default wrapper.withRedux(App);
