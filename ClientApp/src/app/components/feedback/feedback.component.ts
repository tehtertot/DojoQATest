import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { Feedback } from '../../models/Feedback';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['../home/home.component.css']
})
export class FeedbackComponent {
    public loginerrors: string = null;
    public categories = ['Search Functionality', 'Q/A Functionality', 'User Management', 'Ranking', 'General Usability', 'Other'];
    public feedback: Feedback = new Feedback();

    constructor(private _userService: UserService, private _feedbackService: FeedbackService, private _router: Router) { }

    sendFeedback() {
        //not getting correct userid back
        this.feedback.user_id = this._userService.getUserId();
        this._feedbackService.submitFeedback(this.feedback).subscribe(
            (res) => console.log(`hello ${res}`),
            (err) => console.log(`bad ${err}`));
    }

}
