import { Component } from '@angular/core';
import { Router } from '@angular/router';

//models
import { User } from '../../../models/User';

//backend services
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})

export class LoginComponent {
    public login: User = new User();
    public loginerrors: string = null;

    constructor(private _userService: UserService, private _router: Router) { 
        this.login.Email = "ncaldwell@codingdojo.com";
        this.login.Password = "Tiavgp2r!";
    }

    userlogin() {
        this._userService.loginUser(this.login) 
            .subscribe(
                (u) => this.successfulRedirect(u.auth_token), 
                (err) => this.loginerrors = err.error.login);
    }

    successfulRedirect(token: string) {
        localStorage.setItem('auth_token', token);
        this._userService.setLoggedInStatus(true);
        this._router.navigate(['/questions/all']);
    }
}
