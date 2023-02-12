import { signIn, useSession } from "next-auth/react"
import Layout from "../components/layout"
import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { Partner, Stats } from "../types"
import RequestModal from "../components/sendRequestModal"
import { useState } from "react"
import { Loading } from "../components/loading"
import { Error } from "../components/errors"
import { CheckMark } from "../components/checkmark"

export default function MePage() {
  const [open, setOpen] = useState(false)
  const { data, isLoading, isError, error } = useQuery<Stats, AxiosError<any, any>>({ queryFn: () => axios.get("/api/hello").then(res => res.data), queryKey: "userProfile", staleTime: Infinity })
  if (!data && !isLoading) {
    signIn("google")
    return
  }
  console.log(data)
  return (
    <Layout>
      {
        open ? <RequestModal close={() => setOpen(false)} /> : null
      }
      <div className="flex flex-col w-[min(100%,700px)] px-3">
        <div className="flex flex-col gap-16 items-center w-full py-16 border-b">
          <div className="flex flex-col sm:flex-row items-center gap-10">
            <img src={data?.image!} alt="" className="rounded-full" />
            <div className="flex flex-col items-center">
              <p className="font-bold text-2xl text-center">{data?.name}</p>
              <p>{data?.email}</p>
            </div>
          </div>

          {
            data?.sendRequest && !data.hasPartner ? <PartnerSent {...data.partner!} /> : null
          }
          {
            data?.recievedRequest && !data.hasPartner ? <PartnerRequest {...data.partner!} /> : null
          }
          {
            data?.hasPartner ? <PartnerBox {...data.partner!} /> : null
          }
          {
            !(data?.sendRequest || data?.recievedRequest || data?.hasPartner) ? (
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

            ) : null
          }

        </div>
        <div className="py-8">
          <h3 className="font-extrabold text-2xl text-center">Statistics</h3>
          <div className="flex flex-wrap py-8 gap-16 justify-center">
            {
              data ? <>
                <ProfileStat count={data.currentStreak || 0} label={"Current streak"} bg="bg-amber-500" />
                <ProfileStat count={data.answered || 0} label={"Q. answered"} bg="bg-purple-500" />
                <ProfileStat count={data.responses || 0} label={"Q. responses"} bg="bg-green-500" />
              </> : null
            }
            {
              isLoading && <Loading />
            }
            {
              isError && <Error message={error.response?.data.message} />
            }

          </div>
        </div>
      </div>
    </Layout>
  )
}

function PartnerRequest(partner: Partner) {
  const accept = useMutation<any, AxiosError<any, any>>(
    () => axios.put(`/api/user/request`).then(res => res.data),
  )

  const reject = useMutation<any, AxiosError<any, any>>(
    () => axios.delete(`/api/user/request`).then(res => res.data),
  )
  if (reject.isSuccess) {
    return (
      <CheckMark size={30} message={reject.data.message} />
    )
  }
  if (accept.isSuccess) {
    return (
      <CheckMark size={30} message={accept.data.message} />
    )
  }

  return (
    <div className="w-[min(100%,400px)] flex flex-col items-center">
      <p className="text-sm text-center  text-gray-500 mb-4">You've received a request from:</p>
      <div className="w-full rounded-lg bg-green-50 px-8 py-4 mb-6">
        <div className="flex flex-row items-center gap-5">
          <img src={partner.image} alt="" className="rounded-full w-12 h-12" />
          <div className="flex flex-col">
            <p className="font-medium text-green-500">{partner.name}</p>
            <p className="text-gray-500 break-all">{partner.email}</p>
          </div>
        </div>
      </div>
      {
        reject.isError || accept.isError ? <Error message={reject.error?.response?.data.message || accept.error?.response?.data.message || "Something went wrong"} /> : null
      }
      <div className="flex gap-4">
        <button
          onClick={() => reject.mutate()}
          className="block bg-red-50 flex items-center gap-4 text-red-700 rounded-full px-4 py-1 shadow"
        >
          Reject
        </button>
        <button
          onClick={() => accept.mutate()}
          className="block bg-green-500 flex items-center gap-4 text-white rounded-full px-4 py-1 shadow"
        >
          Accept
        </button>
      </div>
    </div>
  )
}


function PartnerSent(partner: Partner) {
  const reject = useMutation<any, AxiosError<any, any>>(
    () => axios.delete(`/api/user/request`).then(res => res.data),
  )
  if (reject.isSuccess) {
    return (
      <CheckMark size={30} message={reject.data.message} />
    )
  }


  return (
    <div className="w-[min(100%,400px)] flex flex-col items-center">
      <p className="text-sm text-center  text-gray-500 mb-4">You send a request to:</p>
      <div className="w-full rounded-lg bg-purple-50 px-8 py-4 mb-6">
        <div className="flex flex-row items-center gap-5">
          <img src={partner.image} alt="" className="rounded-full w-12 h-12" />
          <div className="flex flex-col">
            <p className="font-medium text-purple-500">{partner.name}</p>
            <p className="text-gray-500 break-all">{partner.email}</p>
          </div>
        </div>
      </div>
      {
        reject.isError ? <Error message={reject.error?.response?.data.message || "Something went wrong"} /> : null
      }
      <div className="flex gap-4">
        <button
          onClick={() => reject.mutate()}
          className="block bg-purple-500 flex items-center gap-4 text-white rounded-full px-4 py-1"
        >
          Cancel request
        </button>
      </div>
    </div>
  )
}

function PartnerBox(partner: Partner) {
  return (
    <div className="w-[min(100%,400px)]">
      <p className="text-sm text-center  text-gray-500 mb-4">Daily questions with</p>
      <div className="w-full rounded-lg bg-amber-50 px-8 py-4">
        <div className="flex flex-row items-center gap-5">
          <img src={partner.image} alt="" className="rounded-full w-12 h-12" />
          <div className="flex flex-col">
            <p className="font-medium text-amber-500">{partner.name}</p>
            <p className="text-gray-500 break-all">{partner.email}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

function ProfileStat({ count, label, bg }: { count: number, label: string, bg: string }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className={`flex items-center justify-center w-24 h-24 rounded-full ${bg}`}>
        <p className="text-white font-semibold text-xl">{count}</p>
      </div>
      <p className="font-bold text-[var(--accents-7)]">{label}</p>
    </div>
  )
}