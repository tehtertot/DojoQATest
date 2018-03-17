import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FeedbackDialog } from './components/feedback/feedback.component';

import { Feedback } from './models/Feedback';

import { UserService } from './services/user.service';
import { FeedbackService } from './services/feedback.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DOJOanswers';
  loggedIn: boolean = false;
  
  //for feedback dialog
  feedback: Feedback = new Feedback();

  constructor(private _userService: UserService, public qDialog: MatDialog, private _feedbackService: FeedbackService) {
    this._userService.loggedInStatus.subscribe(status => this.loggedIn = status);
  }

  openFeedback(): void {
    let dialogRef = this.qDialog.open(FeedbackDialog, {
      width: '70%',
      data: { user_id: this._userService.getUserId(), category: this.feedback.category, description: this.feedback.description }
    });

    dialogRef.afterClosed().subscribe(result => {
        this.sendFeedback(result);
    });
  }

  sendFeedback(feedback: Feedback) {
    //not getting correct userid back
    this._feedbackService.submitFeedback(feedback).subscribe(
        (res) => console.log("feedback sent"),
        (err) => console.log(err));
  }
}
