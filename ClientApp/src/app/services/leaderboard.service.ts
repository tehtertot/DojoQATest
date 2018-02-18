// tools
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// models
import { Leader } from '../models/Leader';

@Injectable()
export class LeaderboardService {

  constructor(private _http: HttpClient) { }

  //*********** QUESTIONS *************//
  getLeaders(type: string): Observable<Array<Leader>> {
    return this._http.get<Array<Leader>>(`/leaderboard/${type}`);
  }
}