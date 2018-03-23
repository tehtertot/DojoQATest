import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material';

import * as _ from 'underscore';

//models
import { Leader } from '../../models/Leader';
import { QuestionFromServer } from '../../models/QuestionFromServer';
import { StackMonth } from '../../models/StackMonth';
import { Answer } from '../../models/Answer';

@Component({
    selector: 'leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
    allQuestions: Array<QuestionFromServer>;
    displayedColumns = ["name", "count"];

    //filters
    stackFilter: string = "";
    dateStart: Date;
    dateEnd: Date;
    
    constructor(private _route: ActivatedRoute) {
    }
    
    ngOnInit() {
        this.allQuestions = this._route.snapshot.data.allQuestions;
    }

    resetFilters() {
        this.dateStart = null;
        this.dateEnd = null;
        this.stackFilter = "";
    }
}