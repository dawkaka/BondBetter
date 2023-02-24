import axios, { Axios, AxiosError, AxiosResponse } from "axios"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import Container from "../components/container"
import { Error } from "../components/errors"
import Layout from "../components/layout"
import { Loading } from "../components/loading"
import RequestModal from "../components/sendRequestModal"
import { PartnerRequest, PartnerSent } from "./me"

export default function IndexPage() {
  const { data, isLoading, isSuccess, isError, error } = useQuery<any, AxiosError<any, any>>({
    queryFn: () => axios.get("/api/dailyquestions").then(res => res.data),
    retry: 1
  })



  if (data && data.type) {
    const type = data.type
    switch (type) {
      case "None":
        return <AddPartner />
      case "Received":
        return <Received><PartnerRequest {...data.partner} /></Received>
      case "Sent":
        return <Sent><PartnerSent {...data.partner} /></Sent>
      case "Answered":
        return <Answered  {...data} />
      default:
        break;
    }
  }

  return (
    <Layout>
      {
        isError && <Error message={error.response?.data.message || "Something went wrong"} />
      }
      {
        isLoading && <Loading />
      }
      {
        isSuccess && <Quiz questions={data} />
      }
    </Layout>
  )
}

function Answered({ next }: { next: string }) {
  const [timer, setTime] = useState("--:--:--")
  let interval = useRef<NodeJS.Timer>()
  useEffect(() => {
    if (next) {
      if (interval.current) {
        clearInterval(interval.current)
      }
      interval.current = setInterval(() => {
        const diff = new Date(next).getTime() - Date.now()
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTime(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`)
      }, 1000)
    }
    return () => {
      clearInterval(interval.current)
    }
  }, [next])
  return (
    <Layout>
      <div className="w-full h-full flex flex-col items-center bg-purple-100 overflow-auto">
        <Container>
          <div className="w-[min(100%,550px)] mt-[20vh] flex flex-col items-center gap-10">
            <h3 className="text-2xl text-gray-500 text-center max-w-sm">Next questions in</h3>
            <p className="text-5xl text-green-500">{timer}</p>
          </div>
        </Container>
      </div>
    </Layout>
  )
}


const Quiz = ({ questions }: { questions: { question: string, id: number }[] }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const queryClient = useQueryClient()
  const init = useMemo(() => {
    let ans = []
    if (questions) {
      for (let q of questions) {
        ans.push({ id: q.id, answer: "" })
      }

    }
    return ans
  }, [questions])
  const [answers, setAnswers] = useState<{ id: number, answer: string }[]>(init);

  const answerMutation = useMutation<AxiosResponse, AxiosError<any, any>, { id: number, answer: string }[]>(
    (answers) => axios.post("/api/dailyquestions", { answers }).then(res => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries()
      }
    }
  )
  const handleAnswerChange = (e: any) => {
    if (e.target.value > 280) return
    const curr = answers
    curr[currentQuestionIndex].answer = e.target.value
    setAnswers([...curr]);
  };

  const handlePrevButtonClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNextButtonClick = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  let answeredAll = useMemo(() => {
    for (let ans of answers) {
      if (ans.answer === "") {
        return false
      }
    }
    return true
  }, [answers])

  function sumbitAnswers() {
    if (!answeredAll) {
      alert("Answer all questions")
      return
    }
    if (answerMutation.isLoading) return
    answerMutation.mutate(answers)
  }

  return (
    <div className="w-full h-full flex flex-col items-center bg-purple-700 overflow-auto">
      <Container>
        <div className="w-[min(100%,550px)] flex flex-col items-center">
          <div className="w-full mt-[10vh] p-4 sm:p-10 flex justify-between items-center">
            <div className="flex gap-1">
              {
                answers.map((a, ind) => {
                  return (
                    <div key={ind} className={`w-3 h-3 rounded-full ${a.answer === "" ? "bg-red-500" : "bg-green-500"}`}></div>
                  )
                })
              }
            </div>
            <p className="text-white rounded-full text-sm px-2 py-1 font-bold bg-purple-500"> {currentQuestionIndex + 1} / 5</p>
          </div>
          <div className="w-full flex rounded min-h-[50vh]">
            <div className="w-full rounded my-auto p-4 sm:p-10 flex flex-col gap-10">
              <h3 className="text-2xl text-white font-semibold">
                {questions[currentQuestionIndex].question}
              </h3>
              <textarea
                autoFocus
                rows={1}
                className="bg-transparent border-b px-3 py-2 focus:outline-none text-white text-lg"
                value={answers[currentQuestionIndex].answer}
                onChange={handleAnswerChange}
              >
              </textarea>
              <div className="flex justify-between items-center">
                {currentQuestionIndex > 0 ? (
                  <button
                    className="border border-purple-400 text-white px-6 py-2 rounded-full"
                    onClick={handlePrevButtonClick}
                  >
                    Prev
                  </button>
                )
                  :
                  <p>{' '}</p>
                }
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    className="bg-purple-400 text-white shadow px-6 py-2 rounded-full"
                    onClick={handleNextButtonClick}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={sumbitAnswers}
                    style={{ opacity: answeredAll ? 1 : 0.4 }}
                    disabled={!answeredAll}
                    className="bg-green-500 text-white shadow px-6 py-2 rounded-full"
                  >
                    {answerMutation.isLoading ? <Loading /> : "Submit"}
                  </button>
                )
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};


export function Sent({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="px-4 mt-[10vh] flex flex-col items-center">
        <h3 className="font-medium mb-8">Partner hasn't accepted yet.</h3>
        {children}
      </div>
    </Layout>
  )
}

export function Received({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="px-4 mt-[10vh] flex flex-col items-center">
        <h3 className="font-medium mb-8">New Request!</h3>
        {children}
      </div>
    </Layout>
  )
}

export function AddPartner() {
  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <div className="px-4 mt-[10vh] flex flex-col items-center">
        {
          open ? <RequestModal close={() => setOpen(false)} /> : null
        }
        <h3 className="text-xl font-medium">No partner</h3>
        <p className="max-w-[300px] text-gray-700 text-center mt-4 mb-8">Add a partner to start receiving and answering daily questions with to help you know each other better.</p>
        <button
          className="block bg-green-500 flex items-center gap-4 text-white rounded-full px-4 py-3"
          onClick={() => setOpen(true)}
        >
          <svg height="22px" width="22px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="5" stroke="white" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="29.22" cy="16.28" r="11.14"></circle>
              <path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9"></path><circle cx="45.38" cy="46.92" r="11.94"></circle>
              <line x1="45.98" y1="39.8" x2="45.98" y2="53.8"></line><line x1="38.98" y1="46.8" x2="52.98" y2="46.8"></line>
            </g></svg>
          <span className="font-medium">
            Add partner
          </span>
        </button>
      </div>
    </Layout>
  )
}