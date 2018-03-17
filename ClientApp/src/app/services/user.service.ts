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
    return this._http.get<string>('/UserProfile/UserID');
  }

  getUserId() : string | null {
    return this.userId ? this.userId : null;
  }

  registerUser(user: User): Observable<Token> {
    return this._http.post<Token>('/RegisterUser', user);
  }

  loginUser(user: User): Observable<Token> {
    return this._http.post<Token>('/LoginUser', user);
  }

  getUserInfo(): Observable<UserFromServer> {    
    return this._http.get<UserFromServer>("/UserProfile");
  }

  updateUser(user: User): Observable<UserFromServer> {
    return this._http.post<UserFromServer>("/UserProfile/Update", user);
  }

  updatePassword(user: User): Observable<any> {
    return this._http.post("/UserProfile/ChangePW", user);
  }

  checkToken(): Observable<boolean> {
    return this._http.get<boolean>("/UserProfile/CheckToken");
  }

  // uploadPhoto(photoFile) {
  //   console.log(typeof photoFile);
  //   return this._http.post("/profile/updatePic", {file: photoFile});
  // }
}
