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
  //this list of stacks is associated with the C# ApplicationUser CurrentStack enum
  public stacks: string[] = ["Web Fundamentals", "Python", "C#", "Java", "MEAN"];

  constructor(private _userService: UserService, private _router: Router) { }

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
