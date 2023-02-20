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

export interface Partner { name: string, email: string, image: string }
export interface Stats {
    currentStreak: number;
    responses: number;
    answered: number;
    partner: Partner | null,
    sendRequest: string,
    recievedRequest: string,
    name: string,
    image: string,
    email: string,
    hasPartner: boolean
}

export interface CreateQuestion {
    question: string,
    deleted: boolean,
    hasInput: boolean,
    options: string[],
}


export interface Notifs {
    response: Boolean,
    request: Boolean
}

