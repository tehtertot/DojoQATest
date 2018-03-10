import { Component, OnInit, NgZone, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//model imports
import { QuestionFromServer } from '../../../models/QuestionFromServer';
import { Question } from '../../../models/Question';
import { Answer } from '../../../models/Answer';

//other services
import { QuestionService } from '../../../services/question.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'question',
    templateUrl: './question.component.html',
    styleUrls: ['question.component.css']
})
export class QuestionComponent implements OnInit {   
    public userId: string | null = null;
    public question: QuestionFromServer = new QuestionFromServer();
    public newAnswer : Answer = new Answer();
    public questionUpdate: Question = new Question();
    public answerUpdate: Answer = new Answer();

    constructor(private _router: Router, private _questionService: QuestionService, private _route: ActivatedRoute, private _zone: NgZone, private _userService: UserService, public qDialog: MatDialog) { }

    ngOnInit() {
        this.question = this._route.snapshot.data.question;
        this.userId = this._userService.getUserId();
    }

    submitAnswer() {
        this._questionService.addAnswer(this.newAnswer, this.question.questionId)
            .subscribe((updatedQuestion) => {
                // this.question = updatedQuestion;
                // this.newAnswer = new Answer();
                this._router.navigate(['/questions/all']);
            });
    }

    voteForQuestion(id: number) {
        //can only vote if not yet voted
        if (this.question.canVote) {
            this._questionService.voteForQuestion(id)
                .subscribe((res) => {
                    if (res) {
                        this._zone.run(() => {
                            //update question for view purposes; already updated in DB
                            this.question.canVote = false;
                            this.question.votes++;
                        });
                    }
                });
        }
    }

    voteForAnswer(id: number) {
        //can only vote if not yet voted
        this._questionService.voteForAnswer(id)
            .subscribe((res) => {
                this._zone.run(() => {
                    let thisAnswer = this.question.answers.filter(a => a.answerId == id)[0];
                    thisAnswer.canVote = false;
                    if (res) {
                        thisAnswer.votes++;
                        // thisAnswer.canVote = false;
                    }
                });
        });
    }

    editQuestion(): void {
        let dialogRef = this.qDialog.open(QuestionEditDialog, {
          width: '70%',
          data: { title: this.question.questionTitle, content: this.question.questionText }
        });
    
        dialogRef.afterClosed().subscribe(result => {
            this.updateQuestion(result);
        });
    }
    
    private updateQuestion(updatedQ) {
        this.questionUpdate.QuestionId = this.question.questionId;
        this.questionUpdate.QuestionTitle = updatedQ.title;
        this.questionUpdate.QuestionText = updatedQ.content;
        this._questionService.updateQuestion(this.questionUpdate)
            .subscribe((res) => {
                if (res) {
                    this.question.questionText = this.questionUpdate.QuestionText;
                    this.question.questionTitle = this.questionUpdate.QuestionTitle;
                }
            });
    }

    editAnswer(answerId): void {
        let dialogRef = this.qDialog.open(AnswerEditDialog, {
          width: '70%',
          data: { answerId: answerId, content: this.question.answers.filter(a => a.answerId == answerId)[0].answerText }
        });
    
        dialogRef.afterClosed().subscribe(result => {
            this.updateAnswer(result);
        });
    }

    private updateAnswer(updated) {
        this.answerUpdate.answerId = updated.answerId;
        this.answerUpdate.answerText = updated.content;
        this._questionService.updateAnswer(this.answerUpdate)
            .subscribe((res) => {
                if (res) {
                    this.question.answers.filter(a => a.answerId == this.answerUpdate.answerId)[0].answerText = this.answerUpdate.answerText;
                }
            });
    }
    
}
    
@Component({
    selector: 'question-edit-dialog',
    templateUrl: 'question-edit-dialog.html',
    styleUrls: ['./question.component.css']
})
export class QuestionEditDialog {

    constructor(public dialogRef: MatDialogRef<QuestionEditDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    cancel(): void {
        this.dialogRef.close();
    }
    
}

@Component({
    selector: 'answer-edit-dialog',
    templateUrl: 'answer-edit-dialog.html',
    styleUrls: ['./question.component.css']
})
export class AnswerEditDialog {

    constructor(public dialogRef: MatDialogRef<AnswerEditDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    cancel(): void {
        this.dialogRef.close();
    }
    
}