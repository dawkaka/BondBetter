import { CreateQuestion } from "../types";


export default function DisplayQuestion({ question, hasInput, options, num }: Omit<CreateQuestion, "deleted"> & { num: number }) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-3 text-2xl">
                <h3 className="font-bold">Q{num}.</h3>
                <p className="">{question}</p>
            </div>
            <form className="px-5 mt-5 flex flex-col gap-2">
                {
                    options.map((o, ind) => {
                        return (
                            <div className="flex gap-2" key={o}>
                                <input type="radio" name="answer" id={String(ind)} />
                                <label
                                    htmlFor={String(ind)}
                                    className="bg-amber-500 px-5 rounded-full"
                                >
                                    {o}
                                </label>
                            </div>
                        )
                    })
                }
            </form>
        </div>
    )
}