import ChatForm from '../components/ChatForm.tsx';
import { IMessage, IMessageMutation } from '../../types.ts';
import { createMessage, fetchMessage } from '../chatThunk.ts';
import { useAppDispatch, useAppSelector } from '../../app/hook.ts';
import { CircularProgress, Typography } from '@mui/material';
import { selectFetching, selectMesages } from '../chatSlice.ts';
import { useEffect } from 'react';
import ChatItem from '../components/ChatItem.tsx';

const Chat = () => {
  const dispatch = useAppDispatch();
  const message: IMessage[] = useAppSelector(selectMesages);
  const fetch: boolean = useAppSelector(selectFetching);

  useEffect(() =>{
    dispatch(fetchMessage())
  }, [dispatch])

  const onSubmitFormChat = async (mes: IMessageMutation) => {
    await dispatch(createMessage(mes));
    await dispatch(fetchMessage());
  }

  return (
    <div>
      <ChatForm onSubmit={onSubmitFormChat}/>
      <hr/>
      <Typography variant="h4" textAlign="center" >
        Messages:
      </Typography>
      <>
        {fetch ? <CircularProgress/> :
          <>
            {message.length === 0 && fetch ? <Typography variant="h6">No messages yet</Typography> :
              <>
                {
                  message.map((mes: IMessage) => (
                    <ChatItem key={mes.id} message={mes}/>
                  ))
                }
              </>
            }
          </>
        }
      </>
    </div>
  );
};

export default Chat;