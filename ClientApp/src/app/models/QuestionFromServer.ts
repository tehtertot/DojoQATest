import { Answer } from './Answer';

export class QuestionFromServer {
    questionId: number;
    questionTitle: string;
    questionText: string;
    votes: number;
    canVote: boolean;
    askedByFirstName: string;
    askedByLastName: string;
    askedById: string;
    createdAt: Date;
    answers: Answer[] = [];
    tagsString: string[] = [];
    stack: string;
    
    containsAnyTags(tagsList) {
        let contains = false;
        tagsList.forEach(tag => {
            if (this.tagsString.includes(tag)) {
                return true;
            }
        });
        return contains;
    }
}