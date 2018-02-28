import { Component, OnInit, Input } from '@angular/core';

import { Question } from '../../../models/Question';
import { QuestionFromServer } from '../../../models/QuestionFromServer';
import { CategoryTag } from '../../../models/CategoryTag';

import { QuestionService } from '../../../services/question.service';
import { UserService } from '../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SimpleTag } from '../../../models/SimpleTag';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
    public allQuestions: Array<QuestionFromServer>;

    //for filtering
    public searchStr: string = "";
    //by stack
    public allStacks: Array<CategoryTag>;
    public searchStack: string;
    //by tags
    public allTags: Array<CategoryTag>;
    public filteredTagList: CategoryTag = new CategoryTag();
    public searchTags = new Array<SimpleTag>();

    constructor(private _questionService: QuestionService, private _userService: UserService, private _router: Router, private _route: ActivatedRoute) { 
    }
    
    ngOnInit() {
        this._questionService.getAllTags().subscribe(tags => this.allStacks = tags);
        this.allQuestions = this._route.snapshot.data.allQuestions;
        this._questionService.getAllTags()
            .subscribe((tags) => {
                this.allTags = tags;
            })
    }

    public updateTagsToShow() {
        this.searchTags = new Array<SimpleTag>();
        if (this.searchStack != "") {
            this.filteredTagList = this.allTags.filter(t => t.categoryName == this.searchStack)[0];
            this.filteredTagList.tags.forEach(tag => {
                let t = new SimpleTag();
                t.tagId = tag.tagId;
                t.tagName = tag.tagName;
                this.searchTags.push(t);
            });
        }
        else {
            this.filteredTagList = new CategoryTag();
        }
    }
        
}
