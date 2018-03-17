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
    return this._http.get<Array<QuestionFromServer>>("/QuestionAPI");
  }

  addQuestion(question: Question) : Observable<boolean> {
    return this._http.post<boolean>('/QuestionAPI/New', question);
  }

  getQuestion(id: string | null): Observable<QuestionFromServer> {
    return this._http.get<QuestionFromServer>(`/QuestionAPI/${id}`);
  }

  updateQuestion(question: Question) : Observable<boolean> {
    return this._http.post<boolean>("/QuestionAPI/Edit", question);
  }

  voteForQuestion(questionId: number) : Observable<boolean> {
    return this._http.get<boolean>(`/QuestionAPI/Vote/${questionId}`);
  }

  //************ ANSWERS **************//
  addAnswer(answer: Answer, id: number) : Observable<QuestionFromServer> {
    return this._http.post<QuestionFromServer>(`/QuestionAPI/Answer/${id}`, answer);
  }

  updateAnswer(answer: Answer) : Observable<boolean> {
    return this._http.post<boolean>("/QuestionAPI/Answer/Edit", answer);
  }

  voteForAnswer(answerId: number) : Observable<boolean> {
    return this._http.get<boolean>(`/QuestionAPI/Answer/Vote/${answerId}`);
  }

  deleteAnswer(answerId: number) : Observable<boolean> {
    return this._http.get<boolean>(`/QuestionAPI/Answer/Delete/${answerId}`);
  }

  //************** TAGS ***************//
  getAllTags(): Observable<Array<CategoryTag>> {
    return this._http.get<Array<CategoryTag>>("/QuestionAPI/Tags");
  }

  // getTagsByCategory(category: string): Observable<CategoryTag> {
  //   return this._http.get<CategoryTag>(`/questions/tags/${category}`);
  // }

}
