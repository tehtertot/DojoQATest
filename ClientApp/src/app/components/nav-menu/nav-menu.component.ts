import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  loggedIn: boolean = false;

  constructor(private _userService: UserService) {
    _userService.loggedInStatus.subscribe(status => this.loggedIn = status);
  }
}
