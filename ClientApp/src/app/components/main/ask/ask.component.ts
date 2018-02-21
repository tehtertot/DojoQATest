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
    public question: Question = new Question();
    public tagList: Array<CategoryTag>;
    public filteredTagList: CategoryTag = new CategoryTag();
    public selectedCategory: string = "";
    public selectedTags: Array<number>;
    public error: string = "";

    constructor(private _questionService: QuestionService, private _router: Router) { }
            
    ngOnInit() {
        this._questionService.getAllTags()
            .subscribe((tags) => {
                this.tagList = tags;
            });    
    }

    public addQuestion() {
        console.log("attempting to add");
        if (this.question.QuestionText.trim() == "") {
            this.question.QuestionText = "";
            window.alert("Question cannot be empty");
        }
        else {
            this.question.QuestionTitle = this.question.QuestionTitle.trim();
            this.question.QuestionText = this.question.QuestionText.trim();
            this.question.Tags = this.selectedTags;
            console.log(this.question);
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

    // public addTag(selectedTag: number) {
    //     //get index of checked/unchecked tag
    //     let idx = this.getQuestionTagIndex(selectedTag);
    //     //not in list? add : remove
    //     idx < 0 ? this.question.Tags.push(this.getTag(selectedTag)) : this.question.Tags.splice(idx, 1);
    // }
        
    // private getQuestionTagIndex(tagIdx: number) : number {
    //     for (let i = 0; i < this.question.Tags.length; i++) {
    //         if (this.question.Tags[i].tagId == tagIdx) {
    //             return i;
    //         }
    //     }
    //     return -1;
    // }

    // private getTag(tagIdx: number) : SimpleTag {
    //     let x = new SimpleTag();        
    //     this.tagList.forEach((cat) => {
    //         cat.tags.forEach((tag) => {
    //             if (tag.tagId == tagIdx) {
    //                 x.tagId = tag.tagId;
    //                 x.tagName = tag.tagName;
    //                 return x;
    //             }
    //         })
    //     })
    //     return x;
    // }
}
