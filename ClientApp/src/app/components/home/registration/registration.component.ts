import { Component } from '@angular/core';
import { Router } from '@angular/router';

//models
import { User } from '../../../models/User';

//backend services
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styles: ['./registration.component.css']
})

export class RegistrationComponent {
    user: User = new User();
    errors: string = "";
    stacks: string[];

    constructor(private _userService: UserService, private _router: Router) { 
        this.stacks = this._userService.getStacks();
    }

    register() {
        this._userService.registerUser(this.user)
            .subscribe(
                (u) => this.successfulRedirect(u.auth_token), 
                (err) => console.log(err));
    }

    successfulRedirect(token: string) {
        localStorage.setItem('auth_token', token);
        this._userService.setLoggedInStatus(true);
        this._router.navigate(['/search/questions']);
    }
}
