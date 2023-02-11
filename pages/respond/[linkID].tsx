import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Container from "../../components/container";
import DisplayQuestion from "../../components/DisplayQuestion";
import { InvalidLink } from "../../components/errors";
import { Loading } from "../../components/loading";
import { CreateQuestion } from "../../types";

export default function RespondPage() {
    const { query } = useRouter()
    const [answers, setAnswers] = useState<string[]>([])
    const { data, isLoading, isError } = useQuery<CreateQuestion[]>({
        queryFn: () => axios.get(`/api/questions/${query.linkID}`).then(res => res.data),
        queryKey: "responses",
        enabled: !!query.linkID,
        retry: 3
    })

    useEffect(() => {
        if (data) {
            setAnswers(new Array(data.length).fill("-- NO ANSWER --"))
        }
    }, [data])

    const answerMutation = useMutation(
        (answers: string[]) => axios.post(`/api/answer/${query.linkID}`, { answers: answers }),
        {
            onSuccess: () => {
                console.log("success")
            },
            onError: (err) => {
                console.log(err)
            }
        }
    )

    function answerChange(val: string, ind: number) {
        setAnswers(answers.map((a, i) => i === ind ? val : a))
    }
    return (
        <div className="w-full flex flex-col items-center">
            <div className="fixed bg-white border-b w-full flex flex-col items-center py-3 px-2">
                <Container>
                    <div className="w-full flex justify-between items-center">
                        <h3 className="font-bold text-2xl sm:text-3xl self-start"><span className="hidden sm:inline"></span>
                            <span
                                className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-pink-600"
                            >
                                {' '} Logo
                            </span>
                        </h3>
                        {
                            answerMutation.isLoading ? <Loading /> : (
                                <button
                                    className="rounded-full bg-green-100 py-1 px-3 text-green-500 shadow"
                                    title="remove question"
                                    onClick={() => answerMutation.mutate(answers)}
                                >
                                    Done
                                </button>
                            )
                        }
                    </div>
                </Container>
            </div>
            <Container>
                <div className="px-2 py-5 pb-16 self-start flex w-full flex-col gap-8 mt-[68px]">
                    {
                        isLoading ? <Loading /> : null
                    }
                    {
                        isError ? <InvalidLink /> : null
                    }
                    {
                        data?.map((q, ind) => {
                            return (
                                <DisplayQuestion {...q} num={ind + 1} updateAnswer={(val: string) => answerChange(val, ind)} />
                            )
                        })
                    }
                </div>
            </Container>
        </div>

    )
}