import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../../../models/Question';
import { QuestionFromServer } from '../../../models/QuestionFromServer';
import { CategoryTag } from '../../../models/CategoryTag';

import { QuestionService } from '../../../services/question.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
    allQuestions: Array<QuestionFromServer>;
    private searchStr: string = "";
    private allTags: Array<CategoryTag>;
    private searchTags: string[] = [];
    private searchStack: string;
    private allStacks;

    constructor(private _questionService: QuestionService, private _userService: UserService, private _router: Router, private _route: ActivatedRoute) { 
        this.allStacks = this._userService.getStacks();
    }
    
    ngOnInit() {
        this.allQuestions = this._route.snapshot.data.allQuestions;
        this._questionService.getAllTags()
            .subscribe((tags) => {
                this.allTags = tags;
            })
    }
            
    public answerQuestion(id: number) {
        this._router.navigate(['/search/questions', id]);
    }

    public addFilterTag(t: string) {
        //not yet in list -- add
        // if (this.searchTags.hasOwnProperty(t)) {
        //     this.searchTags[t] = !this.searchTags[t];
        // }
        // else {

        //     this.searchTags[t] = true;
        // }
        let idx = this.searchTags.indexOf(t);
        if (idx < 0) {
            this.searchTags.push(t);
            // this.allQuestions.filter(question => question.tags);
        }
        //already in list -- remove
        else {
            this.searchTags.splice(idx, 1);
        }
        console.log(this.searchTags);
    }
        
}
