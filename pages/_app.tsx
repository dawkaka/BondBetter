import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import { QueryClientProvider, QueryClient } from 'react-query'
import type { AppProps } from "next/app"
import type { Session } from "next-auth"
const queryClient = new QueryClient();

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
