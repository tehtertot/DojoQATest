import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';

import { User } from '../../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../home.component.css']
})
export class LoginComponent {
  public login: User = new User();
  public loginerrors: string = null;

  constructor(private _userService: UserService, private _router: Router) { }

  userlogin() {
    this._userService.loginUser(this.login) 
      .subscribe(
        (u) => this.successfulRedirect(u.auth_token), 
        (err) => this.loginerrors = err.error.login);
  }

  successfulRedirect(token: string) {
      localStorage.setItem('auth_token', token);
      console.log("is the token received?");
      console.log(token);
      this._userService.setLoggedInStatus(true);
      this._router.navigate(['/questions/all']);
  }
}
