export class Message {
    public content: string;
    public username: string;
    public messageId?: string;
    public userId?: string;

    constructor(content: string, username: string, messageId?: string, userId?: string) {
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
}