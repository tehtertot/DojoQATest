import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { QuestionService } from './question.service';
import { QuestionFromServer } from '../models/QuestionFromServer';
import { Observable } from 'rxjs';

@Injectable()
export class SingleQuestionResolver implements Resolve<QuestionFromServer> {
    constructor(private _questionService: QuestionService) { }

    resolve(route: ActivatedRouteSnapshot) : Observable<any> | Promise<any> | any {
        return this._questionService.getQuestion(route.paramMap.get("id"));
    }
}