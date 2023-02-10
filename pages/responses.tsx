import { useState } from "react"
import Container from "../components/container"
import Layout from "../components/layout"

export default function Page() {
  return (
    <Layout>
      <div className="bg-white w-full flex flex-col items-center py-3 px-2">
        <Container>
          <div className="w-full flex justify-between items-center">
            <h3 className="font-bold text-2xl sm:text-3xl self-start">
              <span
                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600"
              >
                {' '}  Responses
              </span>
            </h3>
          </div>
        </Container>
      </div>
      <div className="w-[min(100%,700px)] px-2 py-5 pb-16 flex flex-col gap-8">
        <Response label="Salima" linkID="Xanwoeja" />
        <Response label="Salima" linkID="Xanwoeja" />
        <Response label="Salima" linkID="Xanwoeja" />
        <Response label="Salima" linkID="Xanwoeja" />
        <Response label="Salima" linkID="Xanwoeja" />
      </div>

    </Layout>
  )
}


function Response({ label, linkID }: { label: string, linkID: string }) {
  const [open, setOpen] = useState(false)
  const cls = open ? "text-amber-500 bg-amber-50" : "text-green-500 bg-green-50"
  return (
    <div className="w-full border-b px-5 py-3 rounded-lg">
      <button
        className={`${open ? "pb-3 border-b border-purple-500" : ""} w-full flex  items-center justify-between`}
        onClick={() => setOpen(prv => !prv)}
      >
        <span className="text-gray-700 font-bold self-center">{label}</span>
        <div className="flex gap-5">
          <span
            className={`bg-red-50 text-red-500 rounded-full px-3 py-1 shadow`}
            onClick={(e) => e.stopPropagation()}
          >delete</span>
          <span className={`${cls} rounded-full px-3 py-1 shadow`}>{open ? "close" : "open"}</span>
        </div>
      </button>
      {
        open && (
          <ResponseBody linkID={linkID} />
        )
      }
    </div>

  )
}

function ResponseBody({ linkID }: { linkID: string }) {
  const r = [
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    },
    {
      question: "What is the name of my dog",
      response: "Burna Boy"
    }
  ]
  return (
    <div className="px-2 py-3 sm:px-5">
      {
        r.map((item, ind) => {
          return (
            <div className="mb-8">
              <div className="flex gap-3 mb-3">
                <h3 className="font-bold text-gray-600">Q{ind + 1}.</h3>
                <p className="text-lg text-gray-800"> {item.question}</p>
              </div>
              <p className="border-l border-purple-500 border-l-4 px-2 ml-10">{item.response}</p>
            </div>
          )
        })
      }
    </div>
  )
}