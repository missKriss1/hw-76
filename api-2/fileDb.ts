import {IMessage, INewMessage} from "./types";
import {promises as fs} from 'fs';

const fileName = './db.json';
let data : IMessage [] = [];

const fileDb = {
    async init(){
        try{
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString()) as IMessage[];
        }catch(e){
            console.error(e);
            data = []
        }
    },
    async getMessage(){
        return data;
    },
    async addMessage(newMessage: INewMessage){
        const message : IMessage ={
            id: crypto.randomUUID(),
            author: newMessage.author,
            message: newMessage.message,
            datetime: new Date().toISOString(),
        }
        data.push(message);
        await this.save();
        return message
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
}

export default fileDb