import axios from "axios"
import { isError, useInfiniteQuery, useQuery } from "react-query"
import Container from "../components/container"
import { Error } from "../components/errors"
import Layout from "../components/layout"
import { Loader } from "../components/loader"
import { Loading } from "../components/loading"

interface Answer {
  question: string,
  user: { name: string, answer: string },
  partner?: { name: string, answer: string }
}
export default function ClientPage() {

  const fetchAnswers = ({ pageParam = 0 }) => axios.get(`/api/answers?page=${pageParam}`).then(res => res.data)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError,
    isFetching,
  } = useInfiniteQuery(["answers-daily"], fetchAnswers,
    {
      getNextPageParam: (lastPage) => {
        console.log(lastPage)
        if (lastPage) {
          if (!lastPage.pagination || lastPage.pagination.end) {
            return undefined
          }
        }
        return lastPage.pagination.next
      },
    })

  let answers: Answer[] = []
  if (data && data.pages) {
    for (let page of data.pages) {
      if (page.answers) {
        answers = page.answers.concat(answers)
      }
    }
  }

  return (
    <div className="w-full overflow-auto">
      <Layout>
        <Container>
          <div className="w-[min(100%,500px)] mt-4 px-2 sm:px-4">
            {
              hasNextPage ? <Loader loadMore={() => fetchNextPage()} hasNext={hasNextPage} isFetching={isFetching} /> : null
            }
            {
              isError && <Error message={"Something went wrong"} />
            }
            {
              (
                answers.length === 0 && !hasNextPage && !isFetching) && (
                <div className="w-[min(100%,700px)] px-2 py-5 h-full">
                  <div className="flex flex-col items-center justify-center gap-8 pt-16">
                    <div className="flex flex-col items-center gap-2">
                      <h4 className="font-bold text-3xl text-gray-900 text-center">No Answers yet!</h4>
                      <p className="max-w-[400px] text-center text-[var(--accents-6)]">
                        If you have a partner you're answering questions with, both your answers will appear here.
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
            {isFetching && <Loading />}
            {
              answers.map((d) => {
                return (
                  <div className="text-left mb-6" key={d.question}>
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
