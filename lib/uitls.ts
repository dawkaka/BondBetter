type QuestionsErrors = string[][]

export function validateQuestions(questions: any[]): QuestionsErrors {
    const errors: QuestionsErrors = new Array(25).fill([]).map(arr => [])
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