import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import axios from "axios"
import { useEffect } from "react"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const router = useRouter()
  const { status } = useSession()
  if (status === "unauthenticated") {
    router.replace("/")
  }
  const { data } = useQuery("startup", () => axios.get("/api/startup").then(res => res.data))
  return (
    <header className="fixed top-0 z-10 bg-white w-full flex items-center justify-center px-3 border-b">
      <nav className="w-full flex items-center justify-center">
        <ul className="flex justify-between w-[min(100%,500px)] py-3 items-center">
          <NavLink href="/home" label="Home" icon={HomeIcon()} notif={false} />
          <NavLink href="/answers" label="Answers" icon={AnswerSVG()} notif={false} />
          <NavLink href="/custom-questions" label="Custom Questions" icon={CreateQuestionIcon()} notif={false} />
          <NavLink href="/responses" label="Custom Q asnwers" icon={ResponsesIcon()} notif={data?.response || false} />
          <NavLink href="/me" label="Profile" icon={ProfileIcon()} notif={data?.request || false} />
        </ul>
      </nav>
    </header>
  )
}

function NavLink({ href, label, icon, notif }: { href: string, label: string, icon: JSX.Element, notif: Boolean }) {
  const active = useRouter().pathname === href
  return (
    <li className="relative flex items-center justify-center hover:bg-[var(--primary-lighter)] h-[35px] w-[35px] rounded-full"
      style={{
        backgroundColor: active ? "var(--primary-lighter)" : "",
        color: active ? "var(--primary-dark)" : "var(--accents-7)",
      }}
    >
      {notif && <span className="top-0 right-0 absolute h-2 w-2 rounded-full bg-red-500"></span>}
      <Link href={href} title={label} className="w-full h-full p-2">{icon}</Link>
    </li>
  )
}


function ResponsesIcon() {
  return (

    <svg id="ey6Fqg2VepZ1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48"
      shapeRendering="geometricPrecision" textRendering="geometricPrecision"><g transform="matrix(1 0 0 1.8825 0-21.18)"><g>
        <polygon points="15.706,15.353 15.706,11.251 0.021,23.45 15.706,35.649 15.706,31.548 5.294,23.45" fill="currentColor" />
        <path d="M47.979,29.074c0-6.212-5.038-11.25-11.251-11.25h-.001-11.248v-6.573L9.794,23.45L25.48,35.649v-6.575h14.232c3.106,0,5.625,2.52,5.625,5.625c0,.725-.148,1.413-.399,2.05c1.881-2.01,3.041-4.704,3.041-7.675Z"
          fill="currentColor"
        />
      </g>
      </g>
    </svg>
  )
}

function AnswerSVG() {
  return (
    <svg id="eVRscnAwi8N1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="currentColor" viewBox="0 0 122.88 122.83" shapeRendering="geometricPrecision"
      textRendering="geometricPrecision">
      <g transform="matrix(1 0 0 1.248921 0.000002 0)">
        <path d="M45.44,0h-29.49c-4.4,0-8.17,1.55-11.3,4.65C1.51,7.75,0,11.52,0,15.95v28c0,4.44,1.55,8.21,4.65,11.3c3.1,3.1,6.87,4.65,11.3,4.65h13.11c-.92,3.52-2.04,6.87-3.45,10-1.37,3.17-3.73,6.2-6.97,9.09c6.23-1.62,11.76-4.05,16.66-7.25c4.86-3.17,9.09-7.15,12.57-11.83h10.56c4.4,0,8.17-1.58,11.3-4.65c3.13-3.1,4.65-6.87,4.65-11.3v-28c0-4.4-1.55-8.17-4.65-11.3C66.64,1.51,62.87,0,58.43,0h-12.99v0Zm52.6,56.71h-9.34l-1.34,4.16h-8.41L88.99,35.65h9.02L108,60.87h-8.63l-1.33-4.16v0ZM96.3,51.25l-2.91-9.06-2.92,9.06h5.83v0ZM48.41,37.7c1.09.72,1.81,1.18,2.14,1.36.5.27,1.18.58,2.02.94l-2.43,4.65c-1.22-.56-2.44-1.23-3.64-2-1.2-.78-2.04-1.36-2.52-1.74-1.94.79-4.37,1.19-7.29,1.19-4.32,0-7.73-1.06-10.22-3.19-2.95-2.51-4.42-6.05-4.42-10.6c0-4.42,1.29-7.86,3.87-10.31s6.18-3.67,10.81-3.67c4.72,0,8.35,1.19,10.92,3.59c2.57,2.39,3.85,5.82,3.85,10.27c0,3.95-1.03,7.12-3.09,9.51v0Zm-6.73-4.26c.7-1.18,1.05-2.95,1.05-5.31c0-2.71-.54-4.64-1.6-5.8-1.07-1.16-2.54-1.74-4.42-1.74-1.75,0-3.17.59-4.25,1.78-1.09,1.18-1.63,3.03-1.63,5.55c0,2.93.53,4.99,1.59,6.17s2.52,1.78,4.37,1.78c.6,0,1.16-.06,1.69-.16-.74-.68-1.9-1.31-3.5-1.91l1.38-2.98c.78.13,1.39.3,1.82.49.44.19,1.28.71,2.55,1.54.28.18.6.38.95.59v0Zm81.2-1.29v28c0,2.54-.46,4.93-1.37,7.15-.92,2.22-2.25,4.23-4.09,6.02-.77.77-1.62,1.48-2.46,2.08-.88.63-1.8,1.16-2.71,1.62-.04.04-.11.04-.14.07-1.2.56-2.43.95-3.7,1.23-1.34.28-2.71.42-4.12.42h-13.5c.18.56.35,1.13.56,1.69.53,1.55,1.16,3.1,1.83,4.61v.04c.6,1.41,1.44,2.75,2.47,4.09c1.06,1.37,2.32,2.71,3.84,4.09c1.09.95,1.2,2.61.21,3.7-.67.77-1.69,1.06-2.61.81-3.24-.85-6.34-1.9-9.23-3.17s-5.63-2.75-8.21-4.44c-2.54-1.66-4.93-3.56-7.15-5.63-1.87-1.76-3.63-3.7-5.28-5.74h-9.23c-1.73,0-3.42-.21-5-.63s-3.1-1.09-4.54-1.97c-1.23-.74-1.62-2.36-.88-3.59s2.36-1.62,3.59-.88c.99.6,2.04,1.06,3.2,1.37c1.13.32,2.36.46,3.63.46h10.53c.81,0,1.58.35,2.11,1.06c1.66,2.22,3.49,4.26,5.49,6.13c1.97,1.87,4.12,3.56,6.44,5.07c2.22,1.44,4.58,2.75,7.08,3.87-.49-.81-.88-1.62-1.27-2.43-.7-1.62-1.37-3.28-1.97-5.04-.56-1.66-1.09-3.38-1.55-5.11-.11-.28-.14-.6-.14-.92c0-1.44,1.16-2.64,2.64-2.64h16.94c1.06,0,2.04-.11,2.99-.32.92-.21,1.76-.49,2.57-.85.04-.04.07-.04.11-.07.67-.32,1.34-.7,1.94-1.13.63-.46,1.23-.95,1.8-1.55c1.3-1.3,2.29-2.75,2.92-4.3s.95-3.28.95-5.14v-28c0-1.87-.32-3.59-.95-5.14s-1.62-2.99-2.92-4.3c-1.3-1.3-2.75-2.29-4.3-2.92s-3.28-.95-5.14-.95h-17.69c-1.44,0-2.64-1.16-2.64-2.64c0-1.44,1.16-2.64,2.64-2.64h17.72c2.54,0,4.9.46,7.11,1.37c2.22.92,4.19,2.25,6.02,4.05c1.8,1.8,3.17,3.8,4.05,6.02.92,2.22,1.37,4.58,1.37,7.11h.04v.01Z" />
      </g>
    </svg>
  )
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
        <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill=""></path></g>
    </svg>
  )
}

export function ProfileIcon() {
  return (
    <svg id="etiVShFkKRC1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32.000001 32.000001" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
      <circle r="7.5" transform="matrix(1.211838 0 0 1.206476 16 9.04857)" fill="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeDashoffset="3.2" />
      <path d="M16,19c6.648,0,12,2.899,12,6.5v6.5h-24v-6.5C4,21.899,9.352,19,16,19Z" transform="matrix(1.245847 0 0 0.989548-3.933552 0.266526)" fill="currentColor" strokeWidth="2" strokeLinejoin="bevel" strokeDashoffset="3.2" />
    </svg>
  )
}

function CreateQuestionIcon() {
  return (
    <svg id="ep5Vyv1gAtE1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600"
      shapeRendering="geometricPrecision" textRendering="geometricPrecision"><g transform="matrix(1.000001 0 0 1.000003-.0003-.0009)" fill="currentColor">
        <path d="M300.60937,-12.792969c-173.60599,0-315.214839,141.724839-315.214839,315.404299s141.608849,315.40429,315.214839,315.40429s315.21485-141.72484,315.21485-315.40429-141.60885-315.404299-315.21485-315.404299Zm0,84.082031C428.74215,71.289063,531.74023,174.3418,531.74023,302.61133s-102.99808,231.32226-231.13086,231.32226-231.132808-103.05274-231.132808-231.32226s103.000038-231.322268,231.132808-231.322268Z" transform="matrix(.951732 0 0 0.951158 13.9012 12.1688)" paintOrder="stroke fill markers" strokeWidth="1.05103" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M278.08676,111.38574c-38.36479,8.45756-69.16019,39.17753-76.79854,78.69745-2.013591,10.416332.193369,21.205931,6.13533,29.994994s15.132139,14.857565,25.54862,16.870386c10.415987,2.013035,21.205037-.194141,29.993653-6.135968s14.856874-15.131575,16.869807-25.547582c1.79434-9.28366,9.286-15.75589,18.73178-16.18385s17.49014,5.33989,20.11664,14.42326-1.09839,18.25628-9.3149,22.93547c-3.492736,2.079889-6.648014,4.680048-9.35711,7.71088-.001333.001-.002667.002-.004.003-33.0243,21.0091-50.8245,59.64136-45.33599,98.39549c3.097893,21.872393,23.339828,37.092481,45.21236,33.99557c10.504256-1.487279,19.987416-7.086581,26.363158-15.566045s9.121764-19.144447,7.633932-29.648625c-1.11453-7.86962,2.36064-15.41229,9.06697-19.67825c3.080674-1.966612,5.87728-4.346167,8.31175-7.07224c38.40211-23.26481,56.80531-69.96796,44.27655-113.29678-12.77812-44.19116-54.63578-74.20291-100.59015-72.12083-5.74431.26027-11.37926,1.01551-16.85995,2.22373Z" paintOrder="stroke fill markers" strokeLinecap="round" strokeLinejoin="round" /></g>
      <rect width="29.113924" height="92.405064" rx="0" ry="0" transform="matrix(1.173913 0 0 1.054795 275.316459 387.34175)" fill="currentColor" strokeWidth="0" />
      <rect width="29.113924" height="92.405064" rx="0" ry="0" transform="matrix(0 1.173913-.945206 0 336.075976 418.987343)" fill="currentColor" strokeWidth="0" />
    </svg>
  )
}