import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DOJOanswers';
  loggedIn: boolean = false;
  constructor(private _userService: UserService) {
    _userService.loggedInStatus.subscribe(status => this.loggedIn = status);
  }
}
