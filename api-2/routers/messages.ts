import express from "express";
import fileDb from "../fileDb";
import {INewMessage} from "../types";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    const queryDate = req.query.datetime as string;

    if(queryDate){
        const date = new Date(queryDate);
        if (isNaN(date.getTime())) {
             res.status(400).send({ error: 'Invalid datetime format' });
        }
        try{
            const messages = await fileDb.getMessage();
            const filteredMessages = messages.filter(msg => new Date(msg.datetime) > date);
            res.send(filteredMessages);
        }catch (e){
            console.error(e);
        }
    }
    try{
        const messages = await fileDb.getMessage()
        res.send(messages.slice(-30));
    }catch (e){
        console.error(e);
    }

})

messagesRouter.post("/", async (req, res) => {
    const {author, message} = req.body as INewMessage;

    if (!author || !message || author.trim() === '' || message.trim() === '') {
         res.status(400).send({ error: 'Author and message must be present in the request' });
    }

    try{
        const newMessage = await fileDb.addMessage({author, message});
        res.send(newMessage);
    }catch (e){
        console.error(e);
    }

})

export default messagesRouter;
