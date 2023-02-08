import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function MePage() {
  const { data } = useSession()
  console.log(data)

  return (
    <Layout>
      <div className="w-full flex flex-col items-center mt-[60px]">
        <div className="flex flex-col h-[700px] w-[min(100%,700px)]">
          <div className="flex flex-col items-center h-[500px] w-full p-10">
            <div className="flex items-center gap-10">
              <img src={data?.user?.image!} alt="" className="rounded-full" />
              <div>
                <p className="font-bold text-2xl text-center">{data?.user?.name}</p>
                <p>{data?.user?.email}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </Layout>
  )
}
