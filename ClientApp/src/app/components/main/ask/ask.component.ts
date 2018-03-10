import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionService } from '../../../services/question.service';

import { Question } from '../../../models/Question';
import { SimpleTag } from '../../../models/SimpleTag';
import { CategoryTag } from '../../../models/CategoryTag';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'ask',
    templateUrl: './ask.component.html',
    styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
    question: Question = new Question();
    tagList: Array<CategoryTag>;
    filteredTagList: CategoryTag = new CategoryTag();
    selectedCategory: string = "";
    selectedTags: Array<number>;
    error: string = "";

    constructor(private _questionService: QuestionService, private _router: Router) { }
            
    ngOnInit() {
        this._questionService.getAllTags()
            .subscribe((tags) => {
                this.tagList = tags;
            });    
    }

    public addQuestion() {
        if (this.question.QuestionText.trim() == "") {
            this.question.QuestionText = "";
            window.alert("Question cannot be empty");
        }
        else {
            this.question.QuestionTitle = this.question.QuestionTitle.trim();
            this.question.Tags = this.selectedTags;
            this._questionService.addQuestion(this.question)
                .subscribe((res) => {
                    if (res) {
                        this._router.navigate(['/questions/all']);
                    }
                    else {
                        this.error = "Error adding question to the database. Please try again.";
                    }
                })
        }
    }

    public updateTagsToShow() {
        this.filteredTagList = this.tagList.filter(t => t.categoryName == this.selectedCategory)[0];
    }
}
