import { Pipe, PipeTransform } from '@angular/core';
import { QuestionFromServer } from '../models/QuestionFromServer';

import * as _ from 'underscore';
import { Leader } from '../models/Leader';
import { MatTableDataSource } from '@angular/material';

@Pipe({
    name: 'leaderboard'
})
export class LeaderboardPipe implements PipeTransform {
    transform(value: Array<QuestionFromServer>, type: string, stack: string, startDate: Date, endDate: Date) {
        //QUESTIONS
        let filteredQuestions = value;
        
        //filter questions down to appropriate stack
        if (stack != "") {
            filteredQuestions = filteredQuestions.filter(q => q.stack == stack);
        }

        //filter by start date
        if (startDate) {
            filteredQuestions = filteredQuestions.filter(q => {
                let compare = new Date(parseInt(q.createdAt.substring(0,4)), parseInt(q.createdAt.substring(5,7))-1, parseInt(q.createdAt.substring(8,10)));
                return compare >= startDate;
            })
        }
        
        //filter by end date
        if (endDate) {
            filteredQuestions = filteredQuestions.filter(q => {
                let compare = new Date(parseInt(q.createdAt.substring(0,4)), parseInt(q.createdAt.substring(5,7))-1, parseInt(q.createdAt.substring(8,10)));
                return compare <= endDate;
            });
        }
        
        let questionsByUser = _.groupBy(filteredQuestions, q => [q.askedById, q.askedByFirstName, q.askedByLastName]);
        
        //iterate through to get overall count value (# questions + votes)
        let sumUserQuestions = [];
        for (let k in questionsByUser) {
            let user = new Leader();
            let info = k.split(',');
            user.userId = info[0];
            user.name = info[1] + " " + info[2];
            user.count = questionsByUser[k].length;
            questionsByUser[k].forEach(question => {
                user.count += question.votes;
            });
            sumUserQuestions.push(user);
        }
        //order descending
        sumUserQuestions = _.sortBy(sumUserQuestions, 'count').reverse();

        //return question data
        if (type == "question") {
            return new MatTableDataSource(sumUserQuestions);
        }

        //ANSWERS
        //based on filtered questions
            //may consider filtering answers independently?
        let filteredAnswers = [];
        filteredQuestions.forEach(q => {
            filteredAnswers = filteredAnswers.concat(q.answers);
        })

        let answersByUser = _.groupBy(filteredAnswers, a => [a.answeredById, a.answeredByName]);

        //iterate through to get overall count value (# questions + votes)
        let sumUserAnswers = [];
        for (let k in answersByUser) {
            let user = new Leader();
            let info = k.split(',');
            user.userId = info[0];
            user.name = info[1];
            user.count = answersByUser[k].length;
            answersByUser[k].forEach(answer => {
                user.count += answer.votes;
            });
            sumUserAnswers.push(user);
        }
        //order descending
        sumUserAnswers = _.sortBy(sumUserAnswers, 'count').reverse();

        return new MatTableDataSource(sumUserAnswers);
    }

}