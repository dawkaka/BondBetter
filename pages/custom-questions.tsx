import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { useAtom } from 'jotai'
import Layout from "../components/layout"

import type { GetServerSidePropsContext } from "next"
import type { Session } from "next-auth"
import Link from "next/link"
import { QuestionsState } from "../jotai"
import { validateQuestions } from "../lib/uitls"
import { CreateQuestion } from "../types"
import { useMemo } from "react"
import DisplayQuestion from "../components/DisplayQuestion"


function isValidQuestion(q: CreateQuestion) {
  if (q.question.length === 0 || q.question.length > 69 || q.deleted) false
  if (q.options.length < 2 && !q.hasInput) false
  for (let p of q.options) {
    if (p.length === 0 || p.length > 30) {
      return false
    }
  }
  return true
}
export default function ServerSidePage({ session }: { session: Session }) {
  const [questions, setQuestions] = useAtom(QuestionsState)
  useMemo(() => {
    let filtered = questions.filter(q => {
      return isValidQuestion(q)
    })
    setQuestions(filtered)
  }, [])

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
          questions.map((q, indx) => {
            return (
              <DisplayQuestion {...q} num={indx + 1} />
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
