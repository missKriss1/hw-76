import { createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../types.ts';
import { createMessage, fetchMessage } from './chatThunk.ts';
import { RootState } from '../app/store.ts';

interface IMessageState {
  items: IMessage[];
  fetching: boolean;
  creating: boolean;
}

const initialState: IMessageState = {
  items: [],
  fetching: false,
  creating: false,
};

export const selectMesages= (state: RootState) => state.messages.items;
export const selectFetching = (state: RootState) => state.messages.fetching;
export const selectCreating = (state: RootState) => state.messages.creating;

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessage.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchMessage.fulfilled, (state, {payload: mes}) => {
        state.fetching = false;
        state.items = mes;
      })
      .addCase(fetchMessage.rejected, (state) => {
        state.fetching = false;
      })
      .addCase(createMessage.pending, (state) => {
        state.creating = true;
      })
      .addCase(createMessage.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createMessage.rejected, (state) => {
        state.creating = false;
      })

  }
});

export const messageReduser = messageSlice.reducer;