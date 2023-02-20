import { useEffect, useState } from "react"
import { useAtom } from 'jotai'
import Container from "../components/container"
import { QuestionsState } from "../jotai"
import { CreateQuestion } from "../types"
import Link from "next/link"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios, { AxiosError, AxiosResponse } from "axios"
import { isValidQuestion } from "../lib/uitls"
import { CheckMark } from "../components/checkmark"
import { Error } from "../components/errors"


export default function CreateQuestions() {
    const [questions, setQuestions] = useAtom(QuestionsState)
    const [saved, setSaved] = useState(false)
    const client = useQueryClient()
    function addQuestion() {
        if (questions.length === 25) return
        setQuestions([...questions, { question: "", hasInput: true, options: ["", ""], deleted: false }])
    }
    const { data } = useQuery("custom-questions", () => axios.get("/api/questions").then(res => res.data), { staleTime: Infinity, retry: 3 })
    useEffect(() => {
        if (data) {
            setQuestions(data)
        }
    }, [data])

    const saveMutation = useMutation<{ message: string }, AxiosError<{ message: string }, any>, CreateQuestion[]>(
        (data) => axios.put("/api/questions", data).then(res => res.data),
        {
            onSuccess: () => {
                setSaved(true)
                client.invalidateQueries("custom-questions")
            },
        }
    )
    function saveQuestions() {
        if (confirm("Saving will invalidate previous links, continue?")) {
            const validQ = questions.filter(q => isValidQuestion(q))
            saveMutation.mutate(validQ)
        }

    }
    return (
        <div className="w-full flex flex-col px-3  items-center">
            <div className="fixed bg-white border-b w-full flex flex-col items-center py-3 px-2">
                <Container>
                    <div className="w-full flex justify-between items-center">
                        <h3 className="font-bold text-2xl sm:text-3xl self-start"><span className="hidden sm:inline">Create</span>
                            <span
                                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600"
                            >
                                {' '}  Questions
                            </span>
                        </h3>
                        {
                            saved ? (
                                <Link href="/custom-questions" >
                                    <button
                                        className="rounded-full bg-purple-50 sm:text-lg py-1 px-3 text-purple-500 shadow"
                                        title="remove question"
                                    >
                                        Preview
                                    </button>
                                </Link>
                            )
                                :
                                (
                                    <button
                                        className="rounded-full bg-green-100 sm:text-lg py-1 px-3 text-green-500 shadow"
                                        title="remove question"
                                        onClick={saveQuestions}
                                    >
                                        Save
                                    </button>
                                )
                        }


                    </div>
                </Container>
            </div>
            <Container>
                <div className="w-full mt-[80px] flex flex-col gap-10">
                    {
                        saveMutation.isSuccess && <CheckMark size={30} message={saveMutation.data.message} />
                    }
                    {
                        saveMutation.isError && <Error message={saveMutation.error?.response?.data.message || "Something went wrong"} />
                    }
                    {
                        questions.map((q, ind) => {
                            return (
                                <Question {...q} num={ind + 1} key={ind} />
                            )
                        })
                    }
                    {
                        questions.length < 25 && (
                            <button
                                className="rounded-full bg-[var(--primary-darker)] px-4 py-2 shadow mb-10 self-start flex items-center gap-2"
                                onClick={addQuestion}
                            >
                                <svg width="18px" height="18px" viewBox="0 0 24 24" fill="var(--primary-darker)" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                        <path
                                            fill="white"
                                            d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z"
                                        >
                                        </path>
                                    </g>
                                </svg>
                                <span className="text-white">Add Question</span>
                            </button>
                        )
                    }
                </div>
            </Container >
        </div >
    )
}



function Question({ hasInput, question, options, deleted, num }: CreateQuestion & { num: number }) {
    const [q, updateQuestions] = useAtom(QuestionsState)
    function updateHasInput(val: boolean) {
        const target = { ...q[num - 1] }
        target.hasInput = val
        updateQuestions([...q.slice(0, num - 1), target, ...q.slice(num)])
    }
    function updateQuestion(question: string) {
        if (question.length > 280) return
        const target = { ...q[num - 1] }
        target.question = question
        updateQuestions([...q.slice(0, num - 1), target, ...q.slice(num)])
    }
    function addOption() {
        const target = { ...q[num - 1] }
        target.options = [...target.options, ""]
        updateQuestions([...q.slice(0, num - 1), target, ...q.slice(num)])
    }
    function optionChange(opIndex: number, newValue: string) {
        if (newValue.length >= 100) return
        const target = { ...q[num - 1] }
        target.options[opIndex] = newValue
        updateQuestions([...q.slice(0, num - 1), target, ...q.slice(num)])
    }
    function removeOption(opIndex: number) {
        const target = { ...q[num - 1] }
        target.options = target.options.filter((op, ind) => ind !== opIndex)
        updateQuestions([...q.slice(0, num - 1), target, ...q.slice(num)])
    }

    function removeQuestion() {
        const target = { ...q[num - 1] }
        target.deleted = true
        updateQuestions([...q.slice(0, num - 1), target, ...q.slice(num)])
    }

    function undoQuestion() {
        const target = { ...q[num - 1] }
        target.deleted = false
        updateQuestions([...q.slice(0, num - 1), target, ...q.slice(num)])
    }

    function deleteQuestion() {
        updateQuestions([...q.slice(0, num - 1), ...q.slice(num)])
    }

    return (
        <div className="border-b">

            {
                deleted ? (
                    <div className="flex justify-between mb-5">
                        <h4 className="block mb-2 font-medium text-gray-900">Q{num}.</h4>
                        <div className="flex gap-3 items-center">
                            <button
                                className="rounded-full bg-[var(--primary-lighter)] py-1 px-3 text-sm text-[var(--primary-dark)] shadow"
                                title="remove question"
                                onClick={undoQuestion}
                            >
                                Undo
                            </button>
                            <button
                                className="rounded-full bg-red-50 py-1 px-3 text-sm text-red-500 shadow"
                                title="remove question"
                                onClick={deleteQuestion}
                            >
                                Remove
                            </button>
                        </div>
                    </div >
                )
                    : (
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-center">
                                    <label htmlFor="message" className="block mb-2 font-medium text-gray-900 dark:text-white">Q{num}.</label>
                                    <button
                                        className="rounded-full bg-[var(--primary-lighter)] p-1"
                                        title="remove question"
                                        onClick={removeQuestion}
                                    >
                                        <svg height="20px" width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                                <path d="M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                                                    stroke="var(--primary-dark)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                >
                                                </path>
                                            </g>
                                        </svg>
                                    </button>
                                </div >
                                <textarea
                                    id="message" rows={2}
                                    className="block p-2.5 w-full text-gray-900 border rounded-lg outline-none focus:border-[var(--primary)]"
                                    value={question}
                                    onChange={(e) => updateQuestion(e.target.value)}
                                    placeholder="Write your question here...">
                                </textarea>
                            </div >
                            <div className="px-2 w-full flex flex-col gap-2">
                                <label className="self-start text-sm text-[var(--accents-6)]" title="allow respondents to enter their own answer">
                                    <input type="checkbox" className="self-start accent-[var(--primary-darker)] mr-2 "
                                        checked={hasInput}
                                        onChange={(e) => updateHasInput(e.target.checked)}
                                    />
                                    Cutom answer
                                </label>
                                {
                                    options.map((o, ind) => <Option key={ind} option={o} onChange={(val: string) => optionChange(ind, val)} remove={() => removeOption(ind)} />)
                                }
                                {
                                    options.length < 4 && (
                                        <button
                                            onClick={addOption}
                                            className="rounded-full mt-3 bg-[var(--primary-lighter)] px-4 py-2  self-start flex items-center gap-2 shadow"
                                        >
                                            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="var(--primary-darker)" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                                                    <path
                                                        fill="var(--primary-dark)"
                                                        d="M13.5 3C13.5 2.44772 13.0523 2 12.5 2H11.5C10.9477 2 10.5 2.44772 10.5 3V10.5H3C2.44772 10.5 2 10.9477 2 11.5V12.5C2 13.0523 2.44772 13.5 3 13.5H10.5V21C10.5 21.5523 10.9477 22 11.5 22H12.5C13.0523 22 13.5 21.5523 13.5 21V13.5H21C21.5523 13.5 22 13.0523 22 12.5V11.5C22 10.9477 21.5523 10.5 21 10.5H13.5V3Z"
                                                    >
                                                    </path>
                                                </g>
                                            </svg>
                                            <span className="text-[var(--primary-dark)] text-sm">Add option</span>
                                        </button>
                                    )
                                }
                            </div>
                            <div>
                            </div>
                        </div >
                    )
            }

        </div >
    )
}

export function Option({ option, onChange, remove }: { option: string, onChange: (val: string) => void, remove: () => void }) {
    return (
        <div className="w-full flex gap-1 items-center">
            <input
                type="text"
                placeholder="Write option"
                value={option}
                onChange={(e) => onChange(e.target.value)}
                className="w-full text-sm border flex-stretch rounded-lg py-2 px-3 outline-none focus:border-[var(--primary)]"
            />
            <button className="rounded-full p-1" onClick={remove}>
                <svg height="20px" width="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                        <path d="M16 12H8M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                            stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        >
                        </path>
                    </g>
                </svg>
            </button>
        </div>
    )
}