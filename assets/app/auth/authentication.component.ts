import {Component} from "@angular/core";
import {AuthService} from "./auth.service";

@Component({
    selector: 'app-authentication',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li class="nav-item"><a class="nav-link" routerLinkActive="active" [routerLink]="['signup']">Signup</a></li>
                    <li class="nav-item" *ngIf="!isLoggedIn()"><a class="nav-link" routerLinkActive="active" [routerLink]="['signin']">Signin</a></li>
                    <li class="nav-item" *ngIf="isLoggedIn()"><a class="nav-link" routerLinkActive="active" [routerLink]="['logout']">Logout</a></li>
                </ul>
            </nav>
        </header>
            <router-outlet></router-outlet>
    `
})
export class AuthenticationComponent {

    constructor(private authService: AuthService) {}

    //methods
    public isLoggedIn(): boolean
    {
        return this.authService.isLoggedIn();
    }
}