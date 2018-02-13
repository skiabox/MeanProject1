import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/Rx';
import {ErrorService} from "../errors/error.service";

@Injectable()
export class AuthService {

    //constructor
    constructor(private httpClient: HttpClient, private errorService: ErrorService) {

    }

    //methods
    public signup(user: User): Observable<User>
    {
        return this.httpClient.post<User>('http://localhost:3000/user', user)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    public signin(user: User): Observable<User>
    {
        return this.httpClient.post<User>('http://localhost:3000/user/signin', user)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    public logout(): void {
        localStorage.clear();
    }

    public isLoggedIn(): boolean {
        return localStorage.getItem('token') !== null;
    }
}