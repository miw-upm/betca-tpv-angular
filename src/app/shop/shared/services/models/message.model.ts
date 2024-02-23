export class Message {
    fromUserMobile: string;
    toUserMobile: string;
    subject: string;
    text: string
    constructor() {
        this.fromUserMobile = '';
        this.toUserMobile = '';
        this.subject = '';
        this.text = ''
    }
    isAllCompleted(): boolean {
        return this.fromUserMobile !== ''
            && this.toUserMobile !== ''
            && this.subject !== ''
            && this.text !== '';
    }
}
