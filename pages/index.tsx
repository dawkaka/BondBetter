import axios, { AxiosError } from "axios"
import React, { useState } from "react"
import { useQuery } from "react-query"
import Layout from "../components/layout"
import { Loading } from "../components/loading"
import RequestModal from "../components/sendRequestModal"
import { PartnerRequest, PartnerSent } from "./me"

export default function IndexPage() {
  const { data, isLoading, isSuccess, isError, error } = useQuery<any, AxiosError<any, any>>({
    queryFn: () => axios.get("/api/dailyquestions").then(res => res.data),
    retry: 1
  })

  console.log(data)
  if (isError) {
    console.log(error)
    if (error.response?.status === 401) {
      const type = error.response?.data.type
      switch (type) {
        case "None":
          return <AddPartner />
        case "Received":
          return <Received><PartnerRequest {...error.response?.data.partner} /></Received>
        case "Sent":
          return <Sent><PartnerSent {...error.response?.data.partner} /></Sent>
        default:
          break;
      }
    }
  }
  return (
    <Layout>
      {
        isLoading && <Loading />
      }
    </Layout>
  )
}

function Sent({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="px-4 mt-[10vh] flex flex-col items-center">
        <h3 className="font-medium mb-8">Partner hasn't accepted yet.</h3>
        {children}
      </div>
    </Layout>
  )
}

function Received({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className="px-4 mt-[10vh] flex flex-col items-center">
        <h3 className="font-medium mb-8">New Request!</h3>
        {children}
      </div>
    </Layout>
  )
}

function AddPartner() {
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
          <svg height="22px" width="22px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="5" stroke="white" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="29.22" cy="16.28" r="11.14"></circle>
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