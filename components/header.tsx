import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import { useRouter } from "next/router"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header className="w-full flex items-center justify-center px-3 border-b">
      <nav>
        <ul className="flex gap-10 py-3 items-center">
          <NavLink href="/" label="Home" icon={HomeIcon()} />
          <NavLink href="/client" label="Answers" icon={AnswerSVG()} />
          <NavLink href="/server" label="Custom Questions" icon={AnswerSVG()} />
          <NavLink href="/admin" label="Custom Q asnwers" icon={AnswerSVG()} />
          <NavLink href="/me" label="Profile" icon={ProfileIcon()} />
        </ul>
      </nav>
    </header>
  )
}

function NavLink({ href, label, icon }: { href: string, label: string, icon: JSX.Element }) {
  const active = useRouter().pathname === href
  return (
    <li className="flex items-center justify-center hover:bg-[var(--primary-lighter)] h-[35px] w-[35px] rounded-full"
      style={{
        backgroundColor: active ? "var(--primary-lighter)" : "",
        color: active ? "var(--primary-dark)" : "",
      }}
    >
      <Link href={href} title={label} className="w-full h-full p-2">{icon}</Link>
    </li>
  )
}

function AnswerSVG() {
  return (
    <svg fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 490.001 490.001" xmlSpace="preserve">
      <g>
        <g>
          <g>
            <path d="M450,0h-410c-22.056,0-40,17.944-40,40v280c0,22.056,17.944,40,40,40h235v120c0,4.118,2.524,7.814,6.358,9.314
				c1.184,0.463,2.417,0.687,3.639,0.687c2.738,0,5.42-1.126,7.35-3.218L409.38,360H450c22.056,0,40-17.944,40-40V40
				C490,17.944,472.057,0,450,0z M470,320c0,11.028-8.972,20-20,20h-45c-2.791,0-5.455,1.167-7.348,3.217L295,454.423V350
				c0-5.523-4.477-10-10-10h-245c-11.028,0-20-8.972-20-20V40c0-11.028,8.972-20,20-20h410c11.028,0,20,8.972,20,20V320z"/>
            <path d="M144.881,80.001c-3.957,0.047-7.513,2.423-9.072,6.06l-75,175l18.383,7.878L106.594,205h79.982l29.329,64.158
				l18.189-8.315l-80-175C152.45,82.244,148.863,79.974,144.881,80.001z M115.167,185l30.129-70.302L177.433,185H115.167z"/>
            <rect x="255.001" y="115" width="80" height="20" />
            <rect x="350" y="115" width="60" height="20" />
            <rect x="255.001" y="165" width="180" height="20" />
            <rect x="255.001" y="215" width="75" height="20" />
          </g>
        </g>
      </g>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
        <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill=""></path></g>
    </svg>
  )
}

function ProfileIcon() {
  return (
    <svg id="etiVShFkKRC1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.000001 32.000001" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
      <circle r="7.5" transform="matrix(1.211838 0 0 1.206476 16 9.04857)" fill="currentColor" stroke-width="2" stroke-linejoin="bevel" stroke-dashoffset="3.2" />
      <path d="M16,19c6.648,0,12,2.899,12,6.5v6.5h-24v-6.5C4,21.899,9.352,19,16,19Z" transform="matrix(1.245847 0 0 0.989548-3.933552 0.266526)" fill="currentColor" stroke-width="2" stroke-linejoin="bevel" stroke-dashoffset="3.2" />
    </svg>
  )
}