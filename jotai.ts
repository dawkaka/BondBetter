import { atom } from "jotai";
import { CreateQuestion } from "./types";

export const QuestionsState = atom<CreateQuestion[]>(
    [
        { question: "Some cool question", hasInput: true, deleted: false, options: ["option 1", "option 2"] },
        { question: "Is this site awesome", hasInput: true, deleted: false, options: ["YES", "OMG, YES!!!"] }
    ]
)
