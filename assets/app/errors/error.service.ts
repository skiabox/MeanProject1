import {EventEmitter} from "@angular/core";
import {Error} from "./error.model";

export class ErrorService {

    public errorOccurred = new EventEmitter<Error>();

    //methods
    public handleError(error: any): void
    {
        const errorData = new Error(error.error.title, error.error.error.message);
        this.errorOccurred.emit(errorData);
    }
}