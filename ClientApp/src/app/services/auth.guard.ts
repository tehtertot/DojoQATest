import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate() : boolean|Observable<boolean> {
    if(this._userService.isLoggedIn())
    {
      return true;
    }
    else {
      return this._userService.checkToken().map(status => {
        if (status) {
          this._userService.setLoggedInStatus(status);
            return true;
        }
      }).catch(() => {
          this._router.navigate(['/home']);
          return Observable.of(false);
      });
    }
  }
}