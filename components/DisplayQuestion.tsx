import { useEffect, useState } from "react";
import { CreateQuestion } from "../types";


export default function DisplayQuestion({ question, hasInput, options, num }: Omit<CreateQuestion, "deleted"> & { num: number }) {
    const [selected, setSelected] = useState(-1)
    const [answer, setAnswer] = useState("")
    useEffect(() => {
        if (selected >= 0 && selected < options.length) {
            setAnswer(options[selected])
        }
    }, [selected])
    const selectedClass = "bg-green-400 border-none text-white shadow-lg font-bold"
    return (
        <div className="flex flex-col">
            <div className="flex gap-3 text-xl">
                <h3 className="font-bold">Q{num}.</h3>
                <p className="">{question}</p>
            </div>
            <form className="px-5 mt-5 flex flex-col gap-2 w-max-content">
                {
                    options.map((o, ind) => {
                        return (
                            <div className={`${selected === ind ? selectedClass : ""} flex items-center border border rounded-full w-fit-content overflow-hidden`} key={o}>
                                <input type="radio" name="answer" className="ml-5 h-5 w-5 accent-amber-600"
                                    id={String(ind) + String(num)} checked={selected === ind}
                                    onChange={() => setSelected(ind)}
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
                            rows={1}
                            className="block mt-5 bg-transparent p-2  border-b w-full text-gray-900 outline-none focus:border-green-400"
                        >

                        </textarea>
                    )
                }
            </form>
        </div>
    )
}