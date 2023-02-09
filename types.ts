export interface Question {
    question: string,
    options: [string, string, string, string],
    hasInput: boolean
}

export interface QandA {
    questionLinkID: string,
    question: string,
    answer: string,
    questionBy: string
}

export interface DailyAnswer {
    questionID: number,
    userID: string,
    coupleID: number,
    answer: string,
    day: Date
}

export interface Stats {
    currentStreak: number;
    responses: number;
    answered: number
}

export interface CreateQuestion {
    question: string,
    deleted: boolean,
    hasInput: boolean,
    options: string[]
}