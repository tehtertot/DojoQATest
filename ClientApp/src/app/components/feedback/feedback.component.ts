import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'feedback-dialog',
    templateUrl: './feedback.component.html',
    styleUrls: ['../main/question/question.component.css']
})
export class FeedbackDialog {
    constructor(public dialogRef: MatDialogRef<FeedbackDialog>, @Inject(MAT_DIALOG_DATA) public data: any) { }

    cancel(): void {
        this.dialogRef.close();
    }
}