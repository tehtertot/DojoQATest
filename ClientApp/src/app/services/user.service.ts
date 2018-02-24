import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

//models
import { User } from '../models/User';
import { UserFromServer } from '../models/UserFromServer';
import { Token } from '../models/Token';

@Injectable()
export class UserService {
  loggedInStatus: Observable<boolean>;
  loggedSubject: Subject<boolean>;

  private loggedIn = false;
  private userId: string;
  private stacks = ["Web Fundamentals", "Python", "C#", "Java", "MEAN"];

  constructor(private _http: HttpClient) {
    this.loggedSubject = new Subject<boolean>();
    this.loggedInStatus = this.loggedSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  
  setLoggedInStatus(isLoggedIn: boolean) : void {
    this.loggedSubject.next(isLoggedIn);
    this.loggedIn = isLoggedIn;
    if (isLoggedIn) {
      this.setUserId()
        .subscribe((val) => {
          this.userId = val;
        });
    }
  }

  setUserId() : Observable<string> {
    return this._http.get<string>('/profile/userid');
  }

  getUserId() : string | null {
    return this.userId ? this.userId : null;
  }

  getStacks(): string[] {
    return this.stacks;
  }

  registerUser(user: User): Observable<Token> {
    return this._http.post<Token>('/register', user);
  }

  loginUser(user: User): Observable<Token> {
    return this._http.post<Token>('/login', user);
  }

  getUserInfo(): Observable<UserFromServer> {    
    return this._http.get<UserFromServer>("/profile");
  }

  updateUser(user: User): Observable<UserFromServer> {
    return this._http.post<UserFromServer>("/profile/update", user);
  }

  updatePassword(user: User): Observable<any> {
    return this._http.post("/profile/changepw", user);
  }
}
