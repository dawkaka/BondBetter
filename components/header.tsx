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
    <header className="fixed top-0  bg-white w-full flex items-center justify-center px-3 border-b">
      <nav className="w-full flex items-center justify-center">
        <ul className="flex justify-between w-[min(100%,500px)] py-3 items-center">
          <NavLink href="/" label="Home" icon={HomeIcon()} />
          <NavLink href="/client" label="Answers" icon={AnswerSVG()} />
          <NavLink href="/server" label="Custom Questions" icon={CreateQuestionIcon()} />
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
        color: active ? "var(--primary-dark)" : "var(--accents-7)",
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

function CreateQuestionIcon() {
  return (
    <svg id="ep5Vyv1gAtE1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600"
      shape-rendering="geometricPrecision" text-rendering="geometricPrecision"><g transform="matrix(1.000001 0 0 1.000003-.0003-.0009)" fill="currentColor">
        <path d="M300.60937,-12.792969c-173.60599,0-315.214839,141.724839-315.214839,315.404299s141.608849,315.40429,315.214839,315.40429s315.21485-141.72484,315.21485-315.40429-141.60885-315.404299-315.21485-315.404299Zm0,84.082031C428.74215,71.289063,531.74023,174.3418,531.74023,302.61133s-102.99808,231.32226-231.13086,231.32226-231.132808-103.05274-231.132808-231.32226s103.000038-231.322268,231.132808-231.322268Z" transform="matrix(.951732 0 0 0.951158 13.9012 12.1688)" paint-order="stroke fill markers" stroke-width="1.05103" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M278.08676,111.38574c-38.36479,8.45756-69.16019,39.17753-76.79854,78.69745-2.013591,10.416332.193369,21.205931,6.13533,29.994994s15.132139,14.857565,25.54862,16.870386c10.415987,2.013035,21.205037-.194141,29.993653-6.135968s14.856874-15.131575,16.869807-25.547582c1.79434-9.28366,9.286-15.75589,18.73178-16.18385s17.49014,5.33989,20.11664,14.42326-1.09839,18.25628-9.3149,22.93547c-3.492736,2.079889-6.648014,4.680048-9.35711,7.71088-.001333.001-.002667.002-.004.003-33.0243,21.0091-50.8245,59.64136-45.33599,98.39549c3.097893,21.872393,23.339828,37.092481,45.21236,33.99557c10.504256-1.487279,19.987416-7.086581,26.363158-15.566045s9.121764-19.144447,7.633932-29.648625c-1.11453-7.86962,2.36064-15.41229,9.06697-19.67825c3.080674-1.966612,5.87728-4.346167,8.31175-7.07224c38.40211-23.26481,56.80531-69.96796,44.27655-113.29678-12.77812-44.19116-54.63578-74.20291-100.59015-72.12083-5.74431.26027-11.37926,1.01551-16.85995,2.22373Z" paint-order="stroke fill markers" stroke-linecap="round" stroke-linejoin="round" /></g>
      <rect width="29.113924" height="92.405064" rx="0" ry="0" transform="matrix(1.173913 0 0 1.054795 275.316459 387.34175)" fill="currentColor" stroke-width="0" />
      <rect width="29.113924" height="92.405064" rx="0" ry="0" transform="matrix(0 1.173913-.945206 0 336.075976 418.987343)" fill="currentColor" stroke-width="0" />
    </svg>
  )
}