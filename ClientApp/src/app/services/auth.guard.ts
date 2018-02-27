import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate() {
    if(!this._userService.isLoggedIn())
    {
      console.log("can't activate");
       this._router.navigate(['/home']);
       return false;
    }
    console.log("can activate!");
    return true;
  }
}