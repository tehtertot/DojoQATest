import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { User } from '../../models/User';
import { CategoryTag } from '../../models/CategoryTag';
import { UserFromServer } from '../../models/UserFromServer';


@Component({
    selector: 'profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent {
    user: User = new User();
    stacks: string[];

    constructor(private _userService: UserService, private _router: Router) { }

    ngOnInit() {
        this.stacks = this._userService.getStacks();
        this._userService.getUserInfo()
            .subscribe(
                (userInfo) => {
                    this.setUser(userInfo);
                },
                (err) => console.log(err));
    }

    updateProfile() {
        this._userService.updateUser(this.user)
            .subscribe((userInfo) => {
                this.setUser(userInfo);
            })
    }

    private setUser(fromServer: UserFromServer) {
        this.user.FirstName = fromServer.firstName;
        this.user.LastName = fromServer.lastName;
        this.user.Email = fromServer.email;
        this.user.Password = fromServer.password;
        this.user.LinkedInAccountURL = fromServer.linkedInAccountURL;
        this.user.CurrentStack = fromServer.currentStack;
    }
}
