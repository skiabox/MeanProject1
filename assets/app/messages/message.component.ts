import {Component, Input} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    @Input()
    public message: Message;


    public color: string = 'red';

    //constructor
    constructor(private messageService: MessageService) {}

    //methods
    public onEdit()
    {
        this.messageService.editMessage(this.message);
    }

    public onDelete(): void
    {
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
    }

    public belongsToUser(): boolean
    {
        return localStorage.getItem('userId') === this.message.userId;
    }

}