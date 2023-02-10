import { atom } from "jotai";
import { CreateQuestion } from "./types";

export const QuestionsState = atom<CreateQuestion[]>(
    [
        { question: "What is your favorite childhood memoery?", hasInput: true, deleted: false, options: [] },
        { question: "Which country would you rather visit?", hasInput: false, deleted: false, options: ["China", "Ghana", "France", "Qatar"] },
        { question: "Best city you've ever been to?", hasInput: true, deleted: false, options: ["Paris", "Accra", "Lagos", "Bangcock"] },
        { question: "What is your favorite childhood memoery?", hasInput: true, deleted: false, options: [] },
        { question: "Which country would you rather visit?", hasInput: false, deleted: false, options: ["China", "Ghana", "France", "Qatar"] },
        { question: "Best city you've ever been to?", hasInput: true, deleted: false, options: ["Paris", "Accra", "Lagos", "Bangcock"] },
        { question: "What is your favorite childhood memoery?", hasInput: true, deleted: false, options: [] },
        { question: "Which country would you rather visit?", hasInput: false, deleted: false, options: ["China", "Ghana", "France", "Qatar"] },
        { question: "Best city you've ever been to?", hasInput: true, deleted: false, options: ["Paris", "Accra", "Lagos", "Bangcock"] },
        { question: "What is your favorite childhood memoery?", hasInput: true, deleted: false, options: [] },
        { question: "Which country would you rather visit?", hasInput: false, deleted: false, options: ["China", "Ghana", "France", "Qatar"] },
        { question: "Best city you've ever been to?", hasInput: true, deleted: false, options: ["Paris", "Accra", "Lagos", "Bangcock"] }
    ]
)
