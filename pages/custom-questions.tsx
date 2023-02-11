import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useAtom } from 'jotai'
import Layout from "../components/layout"

import type { GetServerSidePropsContext } from "next"
import type { Session } from "next-auth"
import Link from "next/link"
import { QuestionsState } from "../jotai"
import { CreateQuestion } from "../types"
import { useMemo, useState } from "react"
import DisplayQuestion from "../components/DisplayQuestion"
import { isValidQuestion } from "../lib/uitls"
import { useQuery } from "react-query"
import axios from "axios"
import LinkModal from "../components/creatLinkModal"

export default function ServerSidePage({ session }: { session: Session }) {
  const [questions, setQuestions] = useAtom(QuestionsState)
  const [openModal, setOpenModal] = useState(false)
  useMemo(() => {
    let filtered = questions.filter(q => {
      return isValidQuestion(q)
    })
    setQuestions(filtered)
  }, [])
  const { data } = useQuery("custom-questions", () => axios.get("/api/questions").then(res => res.data), { staleTime: Infinity, retry: 3 })
  if (data) {
    setQuestions(data)
  }

  if (questions.length === 0) {
    return (
      <Layout>
        <div className="w-[min(100%,700px)] px-2 py-5 h-full">
          <div className="flex flex-col items-center justify-center gap-8 pt-16">
            <div className="flex flex-col items-center gap-2">
              <h4 className="font-bold text-3xl text-[var(--accents-8)] text-center">No custom questions.</h4>
              <p className="max-w-[400px] text-center text-[var(--accents-6)]">
                Create new questions and send them to anyone (eg. your partner, someone you are about to date etc.) for them to answer
              </p>
            </div>
            <Link href="/create-questions">
              <button className="rounded-full bg-[var(--primary-lighter)] px-4 py-2 flex items-center gap-2 shadow">
                <svg width="22px" height="22px" viewBox="0 0 24 24" fill="var(--primary-darker)" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path
                      fill="var(--primary-darker)"
                      d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z"
                    >
                    </path>
                  </g>
                </svg>
                <span className="text-[var(--primary-darker)] text-xl">Create questions</span>
              </button>
            </Link>

          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="w-[min(100%,500px)] px-2 py-5 pb-16 flex flex-col gap-8">
        {
          openModal && <LinkModal close={() => setOpenModal(false)} />
        }
        <div className="grid grid-cols-3 gap-5">
          <button
            onClick={() => setOpenModal(true)}
            className="rounded-full mt-3 bg-purple-100 px-4 py-2 self-start flex justify-center items-center gap-2 shadow"
          >
            <svg width="18px" height="18px" viewBox="0 0 24 24" className="shrink-0 fill-purple-500" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <path d="M18 1C15.7909 1 14 2.79086 14 5C14 5.19436 14.0139 5.38549 14.0407 5.57244L8.4479 8.83625C7.77136 8.31202 6.92212 8 6 8C3.79086 8 2 9.79086 2 12C2 14.2091 3.79086 16 6 16C6.92229 16 7.77167 15.6879 8.44827 15.1635L14.0414 18.4227C14.0141 18.6112 14 18.8039 14 19C14 21.2091 15.7909 23 18 23C20.2091 23 22 21.2091 22 19C22 16.7909 20.2091 15 18 15C17.0797 15 16.232 15.3108 15.5561 15.8332L9.95943 12.5719C9.98617 12.3851 10 12.1942 10 12C10 11.8057 9.98614 11.6146 9.95936 11.4277L15.5522 8.16382C16.2287 8.688 17.0779 9 18 9C20.2091 9 22 7.20914 22 5C22 2.79086 20.2091 1 18 1Z">
                </path>
              </g>
            </svg>
            <span className="text-purple-500 text-sm whitespace-nowrap overflow-hidden">Share link</span>
          </button>
          <Link href="/create-questions">
            <button
              className="whitespace-nowrap overflow-hidden rounded-full w-full mt-3 bg-blue-100 px-4 py-2  self-start flex items-center justify-center gap-2 shadow"
            >
              <svg width="18px" height="18px" className="shrink-0 fill-blue-500" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                  <path d="m1392.7 1700.332-44.782-44.781 307.872-307.872 44.781 44.782 77.248 385.12-385.12-77.249Zm-104.117-332.501L596.711 675.959l79.487-79.487 691.872 691.872-79.487 79.487ZM282.123 589.755 128.745 436.38c-10.075-10.076-16.793-24.63-16.793-39.184 0-15.673 6.718-29.108 16.793-40.303L357.13 128.508c11.196-10.076 24.63-16.793 40.303-16.793 14.554 0 29.108 6.717 39.184 16.793l153.376 153.376-307.872 307.872Zm1521.446 747.848L747.849 281.883 516.104 49.02c-63.813-62.693-174.647-62.693-237.341 0L49.259 278.525C17.913 309.872 0 352.414 0 397.195c0 44.782 17.913 87.324 49.26 118.67L282.121 747.61l1055.72 1055.72L1920 1919.761l-116.431-582.158Z" fill-rule="evenodd">
                  </path>
                </g>
              </svg>
              <span className="text-blue-500 text-sm whitespace-nowrap overflow-hidden">Edit</span>
            </button>
          </Link>
          <button
            className="rounded-full mt-3 bg-red-100 px-4 py-2  self-start flex justify-center items-center gap-2 shadow"
          >
            <svg width="18px" height="18px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" className="shrink-0 fill-red-500"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                <path d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z">
                </path>
              </g>
            </svg>
            <span className="text-red-500 text-sm whitespace-nowrap overflow-hidden">Delete all</span>
          </button>
        </div>
        {
          questions.map((q, indx) => {
            return (
              <DisplayQuestion {...q} num={indx + 1} key={indx} />
            )
          })
        }
      </div>
    </Layout >
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  }
}