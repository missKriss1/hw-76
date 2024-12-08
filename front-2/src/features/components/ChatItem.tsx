import { IMessage } from '../../types.ts';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';

interface Props {
  message: IMessage;
}

const ChatItem: React.FC <Props> = ({message}) => {

  const formatDate = (datetime:string) =>{
    const date = dayjs(datetime);
    const now = dayjs();

    if(date.isSame(now.subtract(1, 'day'), 'day')){
      return 'Yesterday'
    }else{
      return  date.format('DD.MM.YYYY HH:mm');
    }
  }

  return (
    <div>
      <Box sx={{ margin:2, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
        <Typography variant="body1" color="primary">{message.author}</Typography>
        <Typography variant="body2" color="textSecondary">
          {formatDate(message.datetime)}
        </Typography>
        <Typography variant="body1">{message.message}</Typography>
      </Box>
    </div>
  );
};

export default ChatItem;