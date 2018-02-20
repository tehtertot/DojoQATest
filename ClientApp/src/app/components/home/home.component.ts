import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { User } from '../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  //login variables
  public login: User = new User();
  public loginerrors: string = null;

  //registration variables
  public user: User = new User();
  public regerrors: string = null;
  public stacks: string[];

  constructor(private _userService: UserService, private _router: Router) { 
    this.login.Email = "ncaldwell@codingdojo.com";
    this.login.Password = "Tiavgp2r!";
    this.stacks = this._userService.getStacks();
  }

  userlogin() {
    this._userService.loginUser(this.login) 
      .subscribe(
        (u) => this.successfulRedirect(u.auth_token), 
        (err) => this.loginerrors = err.error.login);
  }

  register() {
    this._userService.registerUser(this.user)
      .subscribe(
        (u) => this.successfulRedirect(u.auth_token), 
        (err) => this.regerrors = err.error.registration);
  }

  successfulRedirect(token: string) {
      localStorage.setItem('auth_token', token);
      this._userService.setLoggedInStatus(true);
      this._router.navigate(['/questions/all']);
  }
}
