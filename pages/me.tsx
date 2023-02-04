import { useSession } from "next-auth/react"
import Layout from "../components/layout"

export default function MePage() {
  const { data } = useSession()
  console.log(data)

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <p className="text-[red]">Hahaha</p>
    </Layout>
  )
}
