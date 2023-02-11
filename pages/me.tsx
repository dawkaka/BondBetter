import { signIn, useSession } from "next-auth/react"
import Layout from "../components/layout"
import { useQuery } from 'react-query'
import axios from 'axios'
import { Stats } from "../types"
import RequestModal from "../components/sendRequestModal"
export default function MePage() {
  const { data: session } = useSession()
  const { data, isLoading } = useQuery<Stats>({ queryFn: () => axios.get("/api/hello").then(res => res.data), queryKey: "userProfile", staleTime: Infinity })
  if (!session || !session.user) {
    signIn("google")
    return
  }
  const { image, name, email } = session.user
  return (
    <Layout>
      <RequestModal />
      <div className="flex flex-col w-[min(100%,700px)] px-3">
        <div className="flex flex-col gap-16 items-center w-full py-16 border-b">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <img src={image!} alt="" className="rounded-full" />
            <div className="flex flex-col items-center">
              <p className="font-bold text-2xl text-center">{name}</p>
              <p>{email}</p>
            </div>
          </div>
          <button className="block bg-green-500 flex items-center gap-4 text-white rounded-full px-4 py-3">
            <svg height="22px" width="22px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="5" stroke="white" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="29.22" cy="16.28" r="11.14"></circle>
                <path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9"></path><circle cx="45.38" cy="46.92" r="11.94"></circle>
                <line x1="45.98" y1="39.8" x2="45.98" y2="53.8"></line><line x1="38.98" y1="46.8" x2="52.98" y2="46.8"></line>
              </g></svg>
            <span className="font-medium">
              Add partner
            </span>
          </button>

        </div>
        <div className="py-8">
          <h3 className="font-extrabold text-2xl text-center">Statistics</h3>
          <div className="flex flex-wrap py-8 gap-16 justify-center">
            {
              !!data && <>
                <ProfileStat count={data.currentStreak || 0} label={"Current streak"} bg="bg-amber-500" />
                <ProfileStat count={data.answered || 0} label={"Q. answered"} bg="bg-purple-500" />
                <ProfileStat count={data.responses || 0} label={"Q. responses"} bg="bg-green-500" />
              </>
            }
            {
              isLoading && <h3>Loading...</h3>
            }
            {
              (!isLoading && !data) && <h3>Something went wrong</h3>
            }

          </div>
        </div>
      </div>
    </Layout>
  )
}

function ProfileStat({ count, label, bg }: { count: number, label: string, bg: string }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className={`flex items-center justify-center w-24 h-24 rounded-full ${bg}`}>
        <p className="text-white font-semibold text-xl">{count}</p>
      </div>
      <p className="font-bold text-[var(--accents-7)]">{label}</p>
    </div>
  )
}