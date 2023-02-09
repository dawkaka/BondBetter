import Header from "./header"
import Footer from "./footer"
import type { ReactNode } from "react"
import Container from "./container"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center h-full pt-[60px]">
        <main className="w-full flex flex-col items-center h-full">{children}</main>
      </div>
    </>
  )
}
