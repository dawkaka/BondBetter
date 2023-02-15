import axios from "axios"
import { useQuery } from "react-query"
import Container from "../components/container"
import Layout from "../components/layout"

export default function ClientPage() {

  const { data } = useQuery({
    queryFn: () => axios.get("/api/answers").then(res => res.data),
    queryKey: "daily-answers"
  })
  console.log(data)

  return (
    <Layout>
      <Container>
        <p>{JSON.stringify(data)}</p>
      </Container>
    </Layout>
  )
}
