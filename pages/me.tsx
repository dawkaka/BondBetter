import { useSession } from "next-auth/react"
import Container from "../components/container"
import Layout from "../components/layout"
import { useQuery } from 'react-query'
import axios from 'axios'
import { Stats } from "../types"
export default function MePage() {
  const { data: session } = useSession()
  const { data, isLoading } = useQuery<Stats>({ queryFn: () => axios.get("/api/hello").then(res => res.data), queryKey: "userProfile", staleTime: Infinity })
  if (!session || !session.user) {
    return <h1>Login required</h1>
  }
  const { image, name, email } = session.user
  return (
    <Layout>
      <Container>
        <div className="flex flex-col w-[min(100%,700px)] px-3">
          <div className="flex flex-col items-center w-full py-16 border-b">
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <img src={image!} alt="" className="rounded-full" />
              <div className="flex flex-col items-center">
                <p className="font-bold text-2xl text-center">{name}</p>
                <p>{email}</p>
              </div>
            </div>
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
      </Container>
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