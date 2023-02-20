import { useEffect, useRef, useState } from "react";
import { CreateQuestion } from "../types";


export default function DisplayQuestion({ question, hasInput, options, num, updateAnswer }: Omit<CreateQuestion, "deleted"> & { num: number, updateAnswer?: (answer: string) => void }) {
    const [answer, setAnswer] = useState("-- NO ANSWER --")
    const inputRef = useRef<HTMLTextAreaElement>(null)

    function handleAnswer(ind: number | string) {
        let ans = ""
        if (typeof ind === "number" && ind >= 0 && ind < options.length) {
            ans = options[ind]
            if (inputRef.current) {
                inputRef.current.value = ""
            }
        }
        if (typeof ind === "string") {
            ans = ind
        }
        if (ans !== "" && updateAnswer) {
            updateAnswer(ans)
        }
        setAnswer(ans)
    }
    const selectedClass = "bg-green-400 border-none text-white shadow-lg font-bold"
    return (
        <div className="flex flex-col">
            <div className="flex gap-3 text-xl">
                <h3 className="font-medium text-gray-600">Q{num}.</h3>
                <p className="text-gray-700 font-medium">{question}</p>
            </div>
            <form className="px-5 mt-5 flex flex-col gap-2 w-max-content">
                {
                    options.map((o, ind) => {
                        if (o.trim().length === 0) {
                            return null
                        }
                        return (
                            <div className={`${answer === o ? selectedClass : "text-gray-600"} flex items-center border border rounded-full w-fit-content overflow-hidden`} key={o}>
                                <input type="radio" name="answer" className="ml-5 h-5 w-5 accent-amber-600"
                                    id={String(ind) + String(num)} checked={answer === o}
                                    onChange={() => handleAnswer(ind)}
                                />
                                <label
                                    htmlFor={String(ind) + String(num)}
                                    className="pr-5 pl-2 py-2 w-full"
                                >
                                    {o}
                                </label>
                            </div>
                        )
                    })
                }
                {
                    hasInput && (
                        <textarea
                            placeholder="Type answer"
                            ref={inputRef}
                            rows={1}
                            onChange={(e) => handleAnswer(e.target.value)}
                            className={`${answer === inputRef.current?.value ? "border rounded-full px-5 border-green-400" :
                                ""}
                            block mt-5 bg-transparent p-2  border-b w-full 
                            text-gray-900 outline-none focus:border-green-400`
                            }
                        >

                        </textarea>
                    )
                }
            </form>
        </div>
    )
}