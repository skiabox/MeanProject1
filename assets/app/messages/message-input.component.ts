import {Component, OnInit} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html'
})
export class MessageInputComponent implements OnInit{

    private message: Message;

    constructor(private messageService: MessageService) {}

    //methods
    public onSubmit(form: NgForm): void
    {
        if (this.message)
        {
            //Edit
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(result)
                );
            this.message = null;
        }
        else
        {
            //Create
            const message: Message = new Message(form.value.content, 'Max');
            this.messageService.addMessage(message)
                .subscribe(
                    data => console.log(data),
                    error => console.error(error)
                );
        }

        form.resetForm();
    }

    public ngOnInit()
    {
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        );
    }

    public onClear(form: NgForm)
    {
        this.message = null;
        form.resetForm();
    }
}