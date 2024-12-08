import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMessage, IMessageMutation } from '../types.ts';
import axiosApi from '../axiosApi.ts';


export const fetchMessage = createAsyncThunk<IMessage[], void>(
  'messages/fetchMessage',
  async () => {
    const productsResponse = await axiosApi<IMessage[]>('/messages');
    return productsResponse.data || [];
  }
);

export const createMessage = createAsyncThunk<void, IMessageMutation>(
  'messages/createMessage',
  async (mes) => {
    await axiosApi.post('/messages', {...mes});
  }
);