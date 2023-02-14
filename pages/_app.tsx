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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap" rel="stylesheet" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
