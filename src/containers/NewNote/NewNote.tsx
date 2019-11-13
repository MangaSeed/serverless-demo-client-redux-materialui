import React, {
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
  FC,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Container, TextField } from '@material-ui/core';

import {
  selectNoteCreating,
  selectNoteCreateError,
  selectNoteCreated
} from '../../store/selector/note';

import {
  createNoteAction,
  clearNoteStateAction
} from '../../store/reducers/note';

import LoaderButton from '../../components/LoaderButton';

import config from '../../config';

import { useNewNoteStyle } from './NewNote.style';

const NewNote: FC<RouteComponentProps> = ({ history }) => {
  const { push: historyPush } = history;
  const dispatch = useDispatch();
  const classes = useNewNoteStyle();
  const file = useRef<File | null>(null);

  const creatingNote = useSelector(selectNoteCreating);
  const createNoteError = useSelector(selectNoteCreateError);
  const createdNote = useSelector(selectNoteCreated);

  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (createNoteError) alert(createNoteError);

    if (createdNote) {
      dispatch(clearNoteStateAction('create'));
      historyPush('/');
    }
  }, [createNoteError, createdNote, historyPush, dispatch]);

  const validateForm = () => content.length > 0;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    file.current = event.target.files[0];
    setFileName(file.current.name);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    dispatch(
      createNoteAction({ content, attachment: file.current || undefined })
    );
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit} className={classes.newNoteForm}>
        <TextField
          label="Note"
          variant="outlined"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          multiline
          fullWidth
        />
        <h5>Attachment</h5>
        <input
          id="file"
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <Button variant="outlined" component="span">
            Upload
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {fileName ? fileName : 'Select a file'}
        </label>
        <LoaderButton
          type="submit"
          variant="contained"
          color="primary"
          isLoading={creatingNote}
          disabled={!validateForm()}
          fullWidth
        >
          Create
        </LoaderButton>
      </form>
    </Container>
  );
};

export default NewNote;
