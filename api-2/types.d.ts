export interface IMessage{
    id: string;
    message: string;
    author: string;
    datetime: string;
}

export interface INewMessage{
    author: string;
    message: string;
}