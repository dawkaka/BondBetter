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