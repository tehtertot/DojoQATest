import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material';

import * as _ from 'underscore';
//models
import { Leader } from '../../models/Leader';
import { LeaderboardService } from '../../services/leaderboard.service';
import { QuestionFromServer } from '../../models/QuestionFromServer';
import { StackMonth } from '../../models/StackMonth';

@Component({
    selector: 'leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
    private allQuestions: Array<QuestionFromServer>;
    private displayedColumns = ["name", "count"];
    private questionLeadersData;
    private answerLeadersData;

    //potential filters
    private stackFilter: string;
    private monthFilter: StackMonth;

    constructor(private _leaderboardService: LeaderboardService, private _route: ActivatedRoute) {
    }
    
    ngOnInit() {
        this.allQuestions = this._route.snapshot.data.allQuestions;
        // this.questionLeadersData = this.allQuestions.filter(q => q.stack == this.stackFilter);
        this.setQuestionData();
    }

    setQuestionData() {
        var x = _.groupBy(this.allQuestions, q => q.askedById);
        console.log(x);
    }
}



// this._leaderboardService.getLeaders("questions")
//     .subscribe((res) =>
//         this.questionLeadersData = new MatTableDataSource(res)
//     );
//     this._leaderboardService.getLeaders("answers")
//     .subscribe((res) =>
//         this.answerLeadersData = new MatTableDataSource(res)
//     );