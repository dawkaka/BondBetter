import axios from "axios"
import { isError, useQuery } from "react-query"
import Container from "../components/container"
import { Error } from "../components/errors"
import Layout from "../components/layout"
import { Loading } from "../components/loading"

export default function ClientPage() {

  const { data, isLoading, isError } = useQuery({
    queryFn: () => axios.get("/api/answers").then(res => res.data),
    queryKey: "daily-answers"
  })
  console.log(data)

  return (
    <div className="w-full overflow-auto">
      <Layout>
        <Container>
          <div className="w-[min(100%,500px)] mt-4 px-2 sm:px-4">
            {
              isLoading && <Loading />
            }
            {
              isError && <Error message={"Something went wrong"} />
            }
            {
              data?.map((d: { question: string, user: { name: string, answer: string }, partner: { name: string, answer: string } }) => {
                return (
                  <div className="text-left mb-6">
                    <h3 className="text-gray-800 font-bold mb-2">{d.question}</h3>
                    <div className="border-l rounded border-l-4 p-0 pl-2 border-purple-500 mb-4">
                      <span className="text-sm text-purple-500 font-bold">You</span>
                      <p className="text-gray-600">{d.user.answer}</p>
                    </div>
                    {
                      d.partner ?
                        <div className="border-l rounded border-l-4 p-0 pl-2 border-green-500 mb-2">
                          <span className="text-sm text-green-500 font-bold">{d.partner.name}</span>
                          <p className="text-gray-600">{d.partner.answer}</p>
                        </div>
                        : null
                    }
                  </div>
                )
              })
            }

          </div>

        </Container>
      </Layout>
    </div>
  )
}
