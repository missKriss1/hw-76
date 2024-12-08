export interface IMessage extends IMessageMutation{
  id: string;
}

export interface IMessageMutation {
  author: string;
  message: string;
  datetime: string;
}