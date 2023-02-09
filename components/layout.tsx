import Header from "./header"
import Footer from "./footer"
import type { ReactNode } from "react"
import Container from "./container"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Container>
        <main className="w-full flex flex-col items-center h-full">{children}</main>
      </Container>
    </>
  )
}
