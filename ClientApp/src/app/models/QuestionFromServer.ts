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
    createdAt: string;
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

    testMethod() {
        console.log('hello')
    }

    getCreatedAtDate() {
        return new Date(parseInt(this.createdAt.substring(0,4)), parseInt(this.createdAt.substring(5,7)), parseInt(this.createdAt.substring(8,10)));
    }
}