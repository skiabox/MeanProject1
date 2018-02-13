import {Component, OnInit} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <app-message
                            *ngFor="let message of messages"
                            [message]="message"
                            ></app-message>
            </div>
        </div>
    `
})
export class MessageListComponent implements OnInit {

    public messages: Message[];

    constructor(private messageService: MessageService) {

    }

    public ngOnInit(): void
    {
        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                }
            );

    }

}