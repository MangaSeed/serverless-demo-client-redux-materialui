import React, {
  useRef,
  useState,
  useEffect,
  FC,
  ChangeEvent,
  FormEvent
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { API, Storage } from 'aws-amplify';

import {
  INote,
  removeNoteAction,
  updateNoteAction,
  clearNoteStateAction
} from '../../store/reducers/note';

import {
  selectNoteRemoving,
  selectNoteRemoved,
  selectNoteRemoveError,
  selectNoteUpdating,
  selectNoteUpdated,
  selectNoteUpdateError
} from '../../store/selector/note';

import LoaderButton from '../../components/LoaderButton';

import config from '../../config';

import { useNotesStyle } from './Notes.style';

const Notes: FC<RouteComponentProps<{ id: string }>> = ({ history, match }) => {
  const { push: historyPush } = history;

  const classes = useNotesStyle();
  const dispatch = useDispatch();
  const file = useRef<File | null>(null);

  const removing = useSelector(selectNoteRemoving);
  const removed = useSelector(selectNoteRemoved);
  const removeError = useSelector(selectNoteRemoveError);

  const updating = useSelector(selectNoteUpdating);
  const updated = useSelector(selectNoteUpdated);
  const updateError = useSelector(selectNoteUpdateError);

  const [note, setNote] = useState<INote | null>(null);
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadNote = () => API.get('notes', `/notes/${match.params.id}`, null);

    const onLoad = async () => {
      try {
        const { data } = await loadNote();
        const { content, attachment } = data;

        if (attachment) {
          data.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(data);
      } catch (e) {
        alert(e);
      }
    };

    onLoad();
  }, [match.params.id]);

  useEffect(() => {
    if (removed) dispatch(clearNoteStateAction('remove'));
    if (updated) dispatch(clearNoteStateAction('update'));
    if (updated || removed) historyPush('/');
  }, [removed, updated, dispatch, historyPush]);

  useEffect(() => {
    if (removeError) alert(removeError);
    if (updateError) alert(updateError);
  }, [removeError, updateError]);

  const validateForm = () => content.length > 0;
  const formatFilename = (str: string) => str.replace(/^\w+-/, '');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    file.current = event.target.files[0];
    setFileName(file.current.name);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!note) return;
    if (!content) return;
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    const newNote = { ...note, content };

    dispatch(updateNoteAction({ note: newNote, attachment: file.current }));
  };

  const handleRemove = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmed || !note) return;

    dispatch(
      removeNoteAction({ id: match.params.id, fileName: note.attachment })
    );
  };

  return (
    note && (
      <Container maxWidth="md">
        <form className={classes.notesForm} onSubmit={handleSubmit}>
          <TextField
            id="content"
            label="Note"
            variant="outlined"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            multiline
            fullWidth
          />
          <Typography variant="h5" gutterBottom>
            Attachment
          </Typography>
          {note.attachment && (
            <Typography variant="h6">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={note.attachmentURL}
              >
                {formatFilename(note.attachment)}
              </a>
              <br />
            </Typography>
          )}

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

          <Grid spacing={2} container>
            <Grid xs={12} sm={6} item>
              <LoaderButton
                id="removeNoteButton"
                variant="outlined"
                onClick={handleRemove}
                isLoading={removing}
                fullWidth
              >
                Remove
              </LoaderButton>
            </Grid>

            <Grid xs={12} sm={6} item>
              <LoaderButton
                id="updateNoteButton"
                color="primary"
                type="submit"
                variant="contained"
                isLoading={updating}
                disabled={!validateForm()}
                fullWidth
              >
                Save
              </LoaderButton>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  );
};

export default Notes;
