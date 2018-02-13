import {Component} from "@angular/core";

@Component({
    selector: 'app-messages',
    template: `
        <app-message-input></app-message-input>
        <hr>
        <app-message-list></app-message-list>
    `
})
export class MessagesComponent {

}