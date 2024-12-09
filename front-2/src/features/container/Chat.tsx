import ChatForm from '../components/ChatForm.tsx';
import { IMessage, IMessageMutation } from '../../types.ts';
import { createMessage, fetchMessage } from '../chatThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { CircularProgress, Typography } from '@mui/material';
import { selectFetching, selectMesages } from '../chatSlice.ts';
import { useEffect } from 'react';
import ChatItem from '../components/ChatItem.tsx';
import axiosApi from '../../axiosApi.ts';

const Chat = () => {
  const dispatch = useAppDispatch();
  const messages: IMessage[] = useAppSelector(selectMesages);
  const isFetching: boolean = useAppSelector(selectFetching);

  const fetchNewMessages = async () => {
    try {
      if (messages.length > 0) {
        const lastDate = messages[messages.length - 1].datetime;
        const { data: newMessages } = await axiosApi.get(
          '/messages?datetime=' + lastDate,
        );
        return newMessages
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchNewMessages();
    }, 3000);

    if (messages.length === 0) {
      dispatch(fetchMessage());
    }

    return () => clearInterval(interval);
  }, [dispatch, messages]);

  const onSubmitFormChat = async (mes: IMessageMutation) => {
    await dispatch(createMessage(mes));
    await dispatch(fetchMessage());
  };

  return (
    <div>
      <ChatForm onSubmit={onSubmitFormChat} />
      <hr />
      <Typography variant="h4" textAlign="center">
        Messages:
      </Typography>
      <>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <>
            {messages.length === 0 ? (
              <Typography variant="h6">No messages yet</Typography>
            ) : (
              messages.map((mes: IMessage) => (
                <ChatItem key={mes.id} message={mes} />
              ))
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Chat;
