import { QandA, Question } from "../types";

type QuestionsErrors = string[][]

export function validateQuestions(questions: any[]): QuestionsErrors {
    const errors: QuestionsErrors = new Array(questions.length).fill([]).map(() => [])
    let hasError = false
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (!question.question || typeof question.question !== "string" || question.question.length > 256) {
            hasError = true
            errors[i].push("Each question must be a string not greater than 256 characters")
        }
        if ((!Array.isArray(question.options) || question.options.length < 2) && !question.hasInput) {
            hasError = true
            errors[i].push("Each question must have an answer type")
        }
        if (question.options.length > 4) {
            hasError = true
            errors[i].push("Too many options")
        }
    }
    if (hasError) {
        return errors
    }
    return []
}


export function generateLink(): string {
    const alphabets = "abc8debg7hijkl0mn6GH5IJKLMNo9pq1rstuv2wxy3zABCD4EFOPQRSTUVWSYZ"
    let id = ""
    for (let i = 0; i < 15; i++) {
        let ind = Math.floor(Math.random() * 61)
        id += alphabets[ind]
    }
    return id
}

export function validateAnswers(questions: Question[], answers: string[]): QuestionsErrors {
    const errors: QuestionsErrors = new Array(questions.length).fill([]).map(() => [])
    let hasError = false
    for (let i = 0; i < questions.length; i++) {
        if (!questions[i].options.includes(answers[i]) && !questions[i].hasInput) {
            hasError = true
            errors[i].push("Answer not part of options provided")
        }
    }
    if (hasError) {
        return errors
    }
    return []
}

export function mapQuestionsAndAnswers(questions: Question[], answers: string[], userID: string, linkID: string): QandA[] {
    const maped: QandA[] = []
    for (let i = 0; i < questions.length; i++) {
        const q: QandA = {
            question: questions[i].question,
            questionBy: userID,
            questionLinkID: linkID,
            answer: answers[i]
        }
        maped.push(q)
    }
    return maped
}