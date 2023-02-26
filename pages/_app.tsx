import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import { QueryClientProvider, QueryClient } from 'react-query'
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { Provider } from 'jotai'
import Head from "next/head"
import { Router } from "next/router"
import { useEffect, useState } from "react"
const queryClient = new QueryClient();

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0)
  let loadTimeout: NodeJS.Timeout
  let timer: NodeJS.Timer

  useEffect(() => {
    const strt = new Date();
    const start = () => {
      loadTimeout = setTimeout(() => {
        setLoading(true)
        setProgress(0);
        timer = setInterval(() => {
          setProgress(Math.min((new Date().getMilliseconds() - strt.getMilliseconds()) / 2000, 0.9));
        }, 10);
      }, 100)

    };

    const end = () => {
      clearTimeout(loadTimeout)
      setLoading(false);
      clearInterval(timer);
      setProgress(1);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);


  return (
    <SessionProvider session={session}>
      <Head>
        <title>Bond Better With Your Partner</title>
        <link rel="icon" href="/favicon-16x16.png" />
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="referrer" content="always" />
        <meta httpEquiv="X-UA-Compatible" />
        <link rel="canonical" href="https://wwww.bondbetter.site" />
        <meta name="twitter:label1" content="Bond Better" />
        <meta name="twitter:domain" content="bondbetter.site" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="description" content="Answer five questions daily with your partner to know each other better" />
        <meta name="keywords" content="bond better, couple queries, couple questions, couples, love, romance, lovers, social media, soulmate, soulmates" />
        <meta name="fragment" content="!" />
        <meta name="robots" content="index,follow" />
        <meta property="og:title" content="Bond better with your partner" />
        <meta property="og:description" content="Learn five new things about your partner every day!" />
        <meta property="og:image" content="https://www.bondbetter.site/og.png" />
        <meta property="og:url" content="https://www.bondbetter.site" />

        <meta name="twitter:title" content="Bond better with your partner" />
        <meta name="twitter:data1" content="" />
        <meta name="twitter:description" content="Learn five new things about your partner daily" />
        <meta name="twitter:image:alt" content="Bond Better" />
        <meta name="twitter:image" content="https://www.bondbetter.site/og.png" />
        <meta name="twitter:image:src" content="https://www.bondbetter.site/og.png" />

      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider>
          {
            loading && (
              <div className="progress-bar">
                <div style={{ width: `${progress * 100}%` }} />
              </div>
            )
          }
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
