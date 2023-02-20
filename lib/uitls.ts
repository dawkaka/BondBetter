import { CreateQuestion, DailyAnswer, QandA, Question } from "../types";

type QuestionsErrors = string[][]

export function validateQuestions(questions: CreateQuestion[]): QuestionsErrors {
    const errors: QuestionsErrors = new Array(questions.length).fill([]).map(() => [])
    let hasError = false
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (!question.question || typeof question.question !== "string" || question.question.length > 280) {
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
        const flOp = question.options.filter(op => op.length > 0 && op.length <= 100)
        if (flOp.length < 2 && !question.hasInput) {
            hasError = true
            errors[i].push("Each question must have an answer type")
        }
    }
    if (hasError) {
        return errors
    }
    return []
}

export function isValidQuestion(q: CreateQuestion) {
    if (q.question.length === 0 || q.question.length > 280 || q.deleted) false
    if (q.options.length < 2 && !q.hasInput) false
    const flOp = q.options.filter(op => op.length > 0 && op.length <= 100)
    if (flOp.length < 2 && !q.hasInput) {
        return false
    }
    return true
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
    return new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate(), new Date().getUTCHours(), new Date().getUTCMinutes()));
}

export function getCurrentDate(): Date {
    return new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth(), new Date().getUTCDate()));
}

export function nextQuestionsTime(d: Date): Date {
    const now = new Date();

    const hour = d.getUTCHours()
    const min = d.getUTCMinutes()
    const secs = d.getUTCSeconds()

    const hour2 = now.getUTCHours()
    const min2 = now.getUTCMinutes()
    const secs2 = now.getUTCSeconds()

    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());

    if (hour2 > hour) {
        date.setDate(date.getDate() + 1)
    } else if (hour2 === hour && min2 > min) {
        date.setDate(date.getDate() + 1)
    } else if (hour2 === hour && min2 === min && secs2 > secs) {
        date.setDate(date.getDate() + 1)
    }
    return date;
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
    // const y2 = date2.getUTCFullYear()
    // const m2 = date2.getUTCMonth()
    // const d2 = date2.getUTCDate()
    // const h2 = date2.getUTCHours()
    // const min2 = date2.getUTCMinutes()
    // const s2 = date2.getUTCSeconds()

    // const y1 = date1.getUTCFullYear()
    // const m1 = date1.getUTCMonth()
    // const d1 = date1.getUTCDate()
    // const h1 = date1.getUTCHours()
    // const min1 = date1.getUTCMinutes()
    // const s1 = date2.getUTCSeconds()

    // if (y2 > y1) {
    //     return true
    // }
    // if (m2 > m1) {
    //     return true
    // }
    // if (d2 > d1) {
    //     return true
    // }

    // if (y2 === y1 && m2 === m1 && d2 === d1) {
    //     if (h2 > h1) {
    //         return true
    //     }
    //     if (h2 === h1 && min2 > min1) {
    //         return true
    //     }
    //     if (h2 === h1 && min2 === min1 && s2 > s1) {
    //         return true
    //     }
    // }
    // return false
    return date2.getTime() > date1.getTime();
}


export function parseDailyAnswers(userID: string, coupleID: number, answeredQuestions: any[]): [string[][], DailyAnswer[]] {
    const answers: DailyAnswer[] = []
    const errs: string[][] = []
    const today = getCurrentDate()
    let hasErrors = false

    for (let item of answeredQuestions) {
        let err = []
        if (item.id === undefined) {
            hasErrors = true
            err.push("answer body is incomplete, missing question id")
        } else if (item.answer.length > 256) {
            hasErrors = true
            err.push("Answer can not be longer than 256 characters")
        } else if (typeof item.id !== "number") {
            hasErrors = true
            err.push("Wrong questions id format")
        } else {
            const a: DailyAnswer = { questionID: item.id, answer: item.answer.trim() ? item.answer.trim() : "--NO ANSWER--", userID, coupleID, day: today }
            answers.push(a)
        }
        errs.push(err)
    }
    if (hasErrors) {
        return [errs, answers]
    }
    return [[], answers]
}