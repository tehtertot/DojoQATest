// tools
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthInterceptor } from '../services/userauth.interceptor';

// models
import { Question } from '../models/Question';
import { Answer } from '../models/Answer';
import { CategoryTag } from '../models/CategoryTag';
import { QuestionFromServer } from '../models/QuestionFromServer';

@Injectable()
export class QuestionService {

  constructor(private _http: HttpClient) { }

  //*********** QUESTIONS *************//
  getAllQuestions(): Observable<Array<QuestionFromServer>> {
    return this._http.get<Array<QuestionFromServer>>("/questions");
  }

  addQuestion(question: Question) : Observable<boolean> {
    return this._http.post<boolean>('/questions/new', question);
  }

  getQuestion(id: string | null): Observable<QuestionFromServer> {
    return this._http.get<QuestionFromServer>(`/questions/${id}`);
  }

  updateQuestion(question: Question) : Observable<boolean> {
    return this._http.post<boolean>("/questions/edit", question);
  }

  voteForQuestion(questionId: number) : Observable<boolean> {
    return this._http.get<boolean>(`/questions/vote/${questionId}`);
  }

  //************ ANSWERS **************//
  addAnswer(answer: Answer, id: number) : Observable<QuestionFromServer> {
    return this._http.post<QuestionFromServer>(`/questions/answer/${id}`, answer);
  }

  updateAnswer(answer: Answer) : Observable<boolean> {
    return this._http.post<boolean>("/questions/answer/edit", answer);
  }

  voteForAnswer(answerId: number) : Observable<boolean> {
    return this._http.get<boolean>(`/questions/answer/vote/${answerId}`);
  }

  deleteAnswer(answerId: number) : Observable<boolean> {
    return this._http.get<boolean>(`/questions/answer/delete/${answerId}`);
  }

  //************** TAGS ***************//
  getAllTags(): Observable<Array<CategoryTag>> {
    return this._http.get<Array<CategoryTag>>("/questions/tags");
  }

  // getTagsByCategory(category: string): Observable<CategoryTag> {
  //   return this._http.get<CategoryTag>(`/questions/tags/${category}`);
  // }

}
