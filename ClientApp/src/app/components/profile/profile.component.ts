import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

import { User } from '../../models/User';
import { CategoryTag } from '../../models/CategoryTag';
import { UserFromServer } from '../../models/UserFromServer';


@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['../home/home.component.css']
})
export class ProfileComponent {
    user: User = new User();
    stacks: string[] = ["Web Fundamentals", "Python", "C#", "Java", "MEAN"];
    pwmessage: string;
    @ViewChild("pic") picFile;

    constructor(private _userService: UserService, private _router: Router) { }

    ngOnInit() {
        this._userService.getUserInfo()
            .subscribe(
                (userInfo) => {
                    this.setUser(userInfo);
                });
    }

    updateProfile() {
        this._userService.updateUser(this.user)
            .subscribe((userInfo) => {
                // this.setUser(userInfo);
                this._router.navigate(['/questions/all']);
            })
    }

    updatePassword() {
        this._userService.updatePassword(this.user)
            .subscribe((userInfo) => this.pwmessage = "password updated",
            (err) => this.pwmessage = "error updating password");
    }

    // changePic() {
    //     let pic = this.picFile.nativeElement;
    //     if (pic.files && pic.files[0]) {
    //         let fileToUpload = pic.files[0];
    //         console.log(fileToUpload);
    //         this._userService.uploadPhoto(fileToUpload)
    //             .subscribe(res => console.log(res), err => console.log(err));
    //     }
    // }

    private setUser(fromServer: UserFromServer) {
        this.user.FirstName = fromServer.firstName;
        this.user.LastName = fromServer.lastName;
        this.user.Email = fromServer.email;
        this.user.Password = fromServer.password;
        this.user.LinkedInAccountURL = fromServer.linkedInAccountURL;
        this.user.CurrentStack = fromServer.currentStack;
    }
}
