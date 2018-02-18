export class Answer {
    answerId: number;
    answerText: string;
    answeredById: string;
    answeredByName: string;
    answeredDate: Date;
    votes: number;
    canVote: boolean = true;
}