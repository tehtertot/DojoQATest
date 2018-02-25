import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Feedback } from '../models/Feedback';

@Injectable()
export class FeedbackService {
    
    constructor(private _http: HttpClient) { }
    // https://script.google.com/macros/u/0/s/AKfycbyeTwcrXo_cU3ACd1IKoRFYrZKDmo9COjPkJUslCWYBryWCMnQ/exec
    // https://script.google.com/a/codingdojo.com/macros/s/AKfycbyeTwcrXo_cU3ACd1IKoRFYrZKDmo9COjPkJUslCWYBryWCMnQ/exec
    submitFeedback(feedback: Feedback) : Observable<any> {
        return this._http.post("https://script.google.com/a/codingdojo.com/macros/s/AKfycbyeTwcrXo_cU3ACd1IKoRFYrZKDmo9COjPkJUslCWYBryWCMnQ/exec", feedback);
        // return this._http.get("https://script.google.com/a/codingdojo.com/macros/s/AKfycbyeTwcrXo_cU3ACd1IKoRFYrZKDmo9COjPkJUslCWYBryWCMnQ/exec");
    }
}