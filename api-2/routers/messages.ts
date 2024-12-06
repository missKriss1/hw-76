import fileDb from "../fileDb";
import {IMessage, INewMessage} from "../types";
import express from "express";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req , res) => {
    try {
        let messages: IMessage[] = [];
        if(req.query.datetime){
            const queryData = req.query.datetime as string;
            const date = new Date(queryData);
            if (isNaN(date.getDate())) {
                res.status(400).send({error: 'Datetime is incorrect'});
            }else{
                messages = await fileDb.getByDataTime(date);
            }
        }else{
            messages = await fileDb.getMessage()
        }
        res.send(messages);
    }catch (e){
        console.error(e);
    }
});

messagesRouter.post("/", async (req , res) => {
    if(!req.body.author || !req.body.message) {
        res.status(400).send({ error: 'Author and message fields are required' });
    }else{
        try{
            const newMessage: INewMessage = {
                message: req.body.message,
                author: req.body.author,
            };

            const sentMessage = await fileDb.addMessage(newMessage);
            res.send(sentMessage);
        }catch (e){
            console.error(e);
        }
    }
});

export default messagesRouter;
