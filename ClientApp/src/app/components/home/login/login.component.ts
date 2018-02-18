import { Component } from '@angular/core';
import { Router } from '@angular/router';

//models
import { User } from '../../../models/User';

//backend services
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styles: ['./login.component.css']
})

export class LoginComponent {
    public login: User = new User();
    loginerrors: String = "";

    constructor(private _userService: UserService, private _router: Router) { }

    userlogin() {
        console.log(this.login);
        this._userService.loginUser(this.login) 
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
