import Grid from '@mui/material/Grid2';
import { Button, TextField, Typography } from '@mui/material';
import { IMessageMutation } from '../../types.ts';
import { useState } from 'react';
import * as React from 'react';
import dayjs from 'dayjs';

const initialState = {
  author:'',
  message:'',
  datetime: '',
};

interface Props {
  onSubmit: (message: IMessageMutation) => void;
}

const ChatForm: React.FC<Props> = ({onSubmit}) => {
  const [form, setForm] = useState<IMessageMutation>({...initialState});

  const onSubmitForm =  async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({...form, datetime: dayjs().format('DD.MM.YYYY HH:mm')});
    setForm({ ...initialState });
  };

  const disableButton = !form.author.trim() || !form.message.trim();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setForm(prevState => ({...prevState, [name]: value}));
  };
  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <Typography variant="h4" gutterBottom>
          Chat
        </Typography>
        <Grid container direction="column" spacing={2}>
          <Grid size={{xs: 12}}>
            <TextField
              id="author"
              name="author"
              label="Author"
              value={form.author}
              onChange={onInputChange}
            />
          </Grid>

          <Grid size={{xs: 12}}>
            <TextField
              id="message"
              name="message"
              label="Message"
              value={form.message}
              onChange={onInputChange}
            />
          </Grid>
          <Grid>
            <Button type="submit" color="primary" disabled={disableButton}>Add</Button>
          </Grid>
        </Grid>
      </form>

    </div>
  );
};

export default ChatForm;