import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

//models
import { Leader } from '../../models/Leader';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
    selector: 'leaderboard',
    templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
    private displayedColumns = ["name", "count"];
    private questionLeadersData;
    private answerLeadersData;

    constructor(private _leaderboardService: LeaderboardService) { }

    ngOnInit() {
        this._leaderboardService.getLeaders("questions")
            .subscribe((res) =>
                this.questionLeadersData = new MatTableDataSource(res)
            );
            this._leaderboardService.getLeaders("answers")
            .subscribe((res) =>
                this.answerLeadersData = new MatTableDataSource(res)
            );
    }
}
