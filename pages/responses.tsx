import axios, { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"
import Container from "../components/container"
import { Error, InvalidLink } from "../components/errors"
import Layout from "../components/layout"
import { Loading } from "../components/loading"

export default function ResponsesPage() {
  const { data, isError, isLoading } = useQuery<{ label: string, linkID: string }[]>({
    queryFn: () => axios.get("/api/user/links").then(res => res.data),
    queryKey: "responses"
  })
  const mut = useMutation({ mutationFn: () => axios.delete("/api/startup?target=response") })
  useEffect(() => {
    mut.mutate()
  }, [])
  return (
    <Layout>
      <div className="w-[min(100%,700px)] px-2 py-5 pb-16 flex flex-col gap-8">
        <div className="w-full flex justify-between items-center">
          <h3 className="font-bold text-2xl sm:text-3xl self-start">
            <span
              className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600"
            >
              {' '}  Responses
            </span>
          </h3>
        </div>
        {
          isLoading && <Loading />
        }
        {
          isError && <Error message="Something went wrong" />
        }

        {
          (!isLoading && !isError && !data) && (
            <div className="w-[min(100%,700px)] px-2 py-5 h-full">
              <div className="flex flex-col items-center justify-center gap-8 pt-16">
                <div className="flex flex-col items-center gap-2">
                  <h4 className="font-bold text-3xl text-[var(--accents-8)] text-center">You have no responses</h4>
                  <p className="max-w-[400px] text-center text-[var(--accents-6)]">
                    Create new questions and share the link to anyone (eg. your partner, someone you are about to date etc.) and receive their responses
                  </p>
                </div>
              </div>
            </div>
          )
        }
        {
          data?.map(item => <Response {...item} key={item.linkID} />)
        }
      </div>
    </Layout>
  )
}

function Response({ label, linkID }: { label: string, linkID: string }) {
  const [open, setOpen] = useState(false)
  const cls = open ? "text-amber-500 bg-amber-100" : "text-purple-500 bg-purple-100"

  const { data, isLoading, isError, error } = useQuery<{ question: string, answer: string }[], AxiosError<any, any>>({
    queryFn: () => axios.get(`/api/answer/${linkID}`).then(res => res.data),
    queryKey: `response-${linkID}`,
    staleTime: Infinity
  })

  return (
    <div className="w-full border-b px-5 py-3 rounded-lg">
      <button
        className={`${open ? "pb-3 border-b border-purple-500" : ""} w-full flex  items-center justify-between`}
        onClick={() => setOpen(prv => !prv)}
      >
        <span className="text-gray-700 font-bold self-center">{label}</span>
        <div className="flex gap-5">
          {/* <span
            className={`bg-red-100 text-red-500 rounded-full px-3 py-1 shadow`}
            onClick={(e) => e.stopPropagation()}
          >delete</span> */}
          <span className={`${cls} rounded-full px-3 py-1 shadow`}>{open ? "close" : "open"}</span>
        </div>
      </button>
      {
        open && (
          <div className="px-2 py-3 sm:px-5">
            {
              isLoading && <Loading />
            }
            {
              isError && <Error message={error.response?.data.message} />
            }
            {
              data?.map((item, ind) => <ResponseBody {...item} ind={ind} key={ind} />)
            }
          </div>
        )
      }
    </div>

  )
}

function ResponseBody({ question, answer, ind }: { question: string, answer: string, ind: number }) {

  return (
    <div className="mb-4">
      <div className="flex gap-3 mb-3 items-start">
        <p className="font-bold text-gray-800"> {question}</p>
      </div>
      <p className="border-l rounded border-green-500 border-l-4 px-2 text-gray-700">{answer}</p>
    </div>
  )
}