import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';

import { User } from '../../../models/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../home.component.css']
})
export class RegistrationComponent {
  public user: User = new User();
  public regerrors: string = null;
  public stacks: string[];

  constructor(private _userService: UserService, private _router: Router) { 
    this.stacks = this._userService.getStacks();
  }

  register() {
    this._userService.registerUser(this.user)
      .subscribe(
        (u) => this.successfulRedirect(u.auth_token), 
        (err) => this.regerrors = err.error.registration);
  }

  successfulRedirect(token: string) {
      localStorage.setItem('auth_token', token);
      // this._userService.setLoggedInStatus(true);
      this._router.navigate(['/home/login']);
  }
}
