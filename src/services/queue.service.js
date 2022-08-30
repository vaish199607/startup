export class QueueService {
    constructor(producer){
        this._producer = producer;
    }

    async SendMessage(payload){
        const message = {
            body: JSON.stringify(payload)
        }
        await this._producer.sendMessages(message);
    }

}