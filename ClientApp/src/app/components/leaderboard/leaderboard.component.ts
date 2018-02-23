import { Component, OnInit } from '@angular/core';

//models
import { Leader } from '../../models/Leader';
import { LeaderboardService } from '../../services/leaderboard.service';

@Component({
    selector: 'leaderboard',
    templateUrl: './leaderboard.component.html'
})
export class LeaderboardComponent implements OnInit {
    // private questionLeaders: Array<Leader> = [];
    // private answerLeaders: Array<Leader> = [];
    
    constructor(private _leaderboardService: LeaderboardService) { }

    ngOnInit() {
        // this._leaderboardService.getLeaders("questions")
        //     .subscribe((res) =>
        //         this.questionLeaders = res as Array<Leader>
        //     );
        //     this._leaderboardService.getLeaders("answers")
        //     .subscribe((res) =>
        //         this.answerLeaders = res as Array<Leader>
        //     );
    }
}
