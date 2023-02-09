import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function MePage() {
  const { data } = useSession()
  return (
    <Layout>
      <div className="w-full flex flex-col items-center mt-[60px]">
        <div className="flex flex-col w-[min(100%,700px)] px-3">
          <div className="flex flex-col items-center w-full py-16 border-b">
            <div className="flex flex-col sm:flex-row items-center gap-10">
              <img src={data?.user?.image!} alt="" className="rounded-full" />
              <div className="flex flex-col items-center">
                <p className="font-bold text-2xl text-center">{data?.user?.name}</p>
                <p>{data?.user?.email}</p>
              </div>
            </div>
          </div>
          <div className="py-8">
            <h3 className="font-extrabold text-2xl text-center">Statistics</h3>
            <div className="flex flex-wrap py-8 gap-16 justify-center">
              <ProfileStat count={100} label={"Current streak"} bg="bg-amber-500" />
              <ProfileStat count={100} label={"Q. answered"} bg="bg-purple-500" />
              <ProfileStat count={100} label={"Q. responses"} bg="bg-green-500" />
            </div>
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
        <p className="text-white font-semibold">{count}</p>
      </div>
      <p className="font-bold text-[var(--accents-7)]">{label}</p>
    </div>
  )
}