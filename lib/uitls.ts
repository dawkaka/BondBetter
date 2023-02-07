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


export function getCurrentDateAndTime(): Date {
    return new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
}

export function getCurrentDate(): Date {
    return new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes()));
}


export function yesterday(): Date {
    let now = new Date();
    let year = now.getUTCFullYear();
    let month = now.getUTCMonth();
    let date = now.getUTCDate();
    let hour = now.getUTCHours();
    let minute = now.getUTCMinutes();

    if (date === 1) {
        month -= 1;
        if (month < 0) {
            year -= 1;
            month = 11;
        }
        date = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    return new Date(Date.UTC(year, month, date - 1, hour, minute));
}

export function isMoreThan24Hours(date1: Date, date2: Date): boolean {
    let difference = date2.getTime() - date1.getTime();
    return difference >= 24 * 60 * 60 * 1000;
}