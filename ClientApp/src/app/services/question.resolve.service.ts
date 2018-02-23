import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { QuestionService } from './question.service';
import { QuestionFromServer } from '../models/QuestionFromServer';
import { Observable } from 'rxjs';

@Injectable()
export class SingleQuestionResolver implements Resolve<QuestionFromServer> {
    constructor(private _questionService: QuestionService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<any> | Promise<any> | any {
        console.log("RESOLVING...");
        return this._questionService.getQuestion(route.params.id);
    }
}