import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Feedback } from '../models/Feedback';

@Injectable()
export class FeedbackService {
    
    constructor(private _http: HttpClient) { }
    submitFeedback(feedback: Feedback) : Observable<any> {
        return this._http.get(`https://script.google.com/a/codingdojo.com/macros/s/AKfycbyeTwcrXo_cU3ACd1IKoRFYrZKDmo9COjPkJUslCWYBryWCMnQ/exec?user_id=${feedback.user_id}&category=${feedback.category}&description=${feedback.description}&callback=?`);
    }
}