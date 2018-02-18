import { SimpleTag } from "./SimpleTag";

export class Question {
    QuestionId: number;
    QuestionTitle: string;
    QuestionText: string;
    AskedByUser: string;
    Tags: Array<SimpleTag> = [];
}