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
    async getMessage(arr: IMessage[]= data) {
        if (arr) {
            return arr.slice(-30)
        }else{
            return data.slice(-30)
        }
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
    async getByDataTime(dataTime: Date): Promise<IMessage[]> {
        let lastMes: IMessage[] = [];
         data.forEach(mes => {
             if(new Date(mes.datetime)> dataTime){
                 lastMes.push(mes);
             }
         })
        return lastMes;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
}

export default fileDb