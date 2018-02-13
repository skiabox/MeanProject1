import {Message} from "./message.model";
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {EventEmitter, Injectable} from "@angular/core";

import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class MessageService {

    private messages: Message[] = [];

    public messageIsEdit = new EventEmitter<Message>();

    //constructor
    constructor(private httpClient: HttpClient, private errorService: ErrorService) {}
    
    public addMessage(message: Message): Observable<Message>
    {
        //const body = JSON.stringify(message);
        //const headers = new HttpHeaders({'Content-Type': 'application/json'});
        //console.log(this.messages);
        //console.log(message);

        //setup query string by adding the token
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.httpClient.post<Message>('http://localhost:3000/message' + token, message)
            .map((data: any) => {
                const myMessage = new Message(data.obj.content, data.obj.user.firstName, data.obj._id, data.obj.user._id);
                this.messages.push(myMessage);
                return myMessage;
            })
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    //getters
    public getMessages(): Observable<Message[]>
    {
        return this.httpClient.get<Message[]>('http://localhost:3000/message')
            .map( (data: any) => {
                //console.log(messages);
                const transformedMessages: Message[] = [];
                for (const message of data.obj) {
                    transformedMessages.push(new Message(
                        message.content,
                        message.user.firstName,
                        message._id,
                        message.user._id)
                    );
                }
                //console.log(transformedMessages);
                this.messages = transformedMessages;
                return transformedMessages;
        }).catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    public editMessage(message: Message)
    {
        this.messageIsEdit.emit(message);
    }

    public updateMessage(message: Message): Observable<Message>
    {
        //console.log(message.messageId);

        //setup query string by adding the token
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.httpClient.patch<Message>('http://localhost:3000/message/' + message.messageId + token, message)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }

    public deleteMessage(message: Message): Observable<Message>
    {
        this.messages.splice(this.messages.indexOf(message), 1);

        //setup query string by adding the token
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.httpClient.delete<Message>('http://localhost:3000/message/' + message.messageId + token)
            .catch((error: HttpErrorResponse) => {
                this.errorService.handleError(error);
                return Observable.throw(error);
            });
    }
}