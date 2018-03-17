import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//backend services
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'logout',
    template: '<p>logging out...</p>'
})

export class LogoutComponent {
    
    constructor(private _userService: UserService, private _router: Router) { }

    ngOnInit() {
        localStorage.clear();
        this._userService.setLoggedInStatus(false);
        this._router.navigate(['/home']);
    }
    
}
