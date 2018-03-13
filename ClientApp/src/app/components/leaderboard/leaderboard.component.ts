import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material';

import * as _ from 'underscore';
//models
import { Leader } from '../../models/Leader';
import { LeaderboardService } from '../../services/leaderboard.service';
import { QuestionFromServer } from '../../models/QuestionFromServer';
import { StackMonth } from '../../models/StackMonth';
import { Answer } from '../../models/Answer';

@Component({
    selector: 'leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
    private allQuestions: Array<QuestionFromServer>;
    private filteredQuestions: Array<QuestionFromServer> = [];
    private filteredAnswers: Array<Answer> = [];
    displayedColumns = ["name", "count"];
    questionLeadersData;
    answerLeadersData;

    //filters
    stackFilter: string = "";
    dateStart: Date;
    dateEnd: Date;
    
    //potential filters
    private monthFilter: StackMonth;

    constructor(private _leaderboardService: LeaderboardService, private _route: ActivatedRoute) {
    }
    
    ngOnInit() {
        this.allQuestions = this._route.snapshot.data.allQuestions;
        this.setQuestionData();
        this.setAnswerData();
    }

    setQuestionData() {
        this.filteredQuestions = this.allQuestions;
        if (this.stackFilter != "") {
            this.filteredQuestions = this.allQuestions.filter(q => q.stack == this.stackFilter);
        }
            
        this.setQuestionsByUser();
    }

    updateDate() {
        this.filteredQuestions = this.allQuestions;
        if (this.stackFilter != "") {
            console.log("filter by stack");
            this.setQuestionData();
        }
        if (this.dateStart) {
            this.filteredQuestions = this.filteredQuestions.filter(q => {
                // let yr = parseInt(q.createdAt.substring(0,4));
                // let mo = parseInt(q.createdAt.substring(5,7));
                // let dy = parseInt(q.createdAt.substring(8,10));
                // console.log(yr,mo,dy);
                let compare = new Date(parseInt(q.createdAt.substring(0,4)), parseInt(q.createdAt.substring(5,7))-1, parseInt(q.createdAt.substring(8,10)));
                // let compare = new Date(yr, mo - 1, dy);
                 return compare >= this.dateStart;
            });
        }
        if (this.dateEnd) {
            this.filteredQuestions = this.filteredQuestions.filter(q => {
                let compare = new Date(parseInt(q.createdAt.substring(0,4)), parseInt(q.createdAt.substring(5,7))-1, parseInt(q.createdAt.substring(8,10)));
                return compare <= this.dateEnd;
                });
        }

        this.setQuestionsByUser();
    }

    //iterate through all questions to get all answers
    getAllAnswers() {
        this.filteredAnswers = [];
        this.filteredQuestions.forEach(q => {
            this.filteredAnswers = this.filteredAnswers.concat(q.answers);
        });
    }

    setAnswerData() {
        //should this be answers within the time frame? or
        this.getAllAnswers();

        let answersByUser = _.groupBy(this.filteredAnswers, a => [a.answeredById, a.answeredByName]);
            
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
        //set table data
        this.answerLeadersData = new MatTableDataSource(sumUserAnswers);
    }

    private setQuestionsByUser() {
        let questionsByUser = _.groupBy(this.filteredQuestions, q => [q.askedById, q.askedByFirstName, q.askedByLastName]);
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
        //set table data
        this.questionLeadersData = new MatTableDataSource(sumUserQuestions);
        this.setAnswerData();
    }
}