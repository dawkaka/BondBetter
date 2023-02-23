import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import { QueryClientProvider, QueryClient } from 'react-query'
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
import { Provider } from 'jotai'
import Head from "next/head"
const queryClient = new QueryClient();

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Bond Better With Your Partner</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />

        <link rel="icon" href="/favicon-16x16.png" />
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="referrer" content="always" />
        <meta httpEquiv="X-UA-Compatible" />
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
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
