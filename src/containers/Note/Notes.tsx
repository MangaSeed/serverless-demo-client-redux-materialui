import React, {
  useRef,
  useState,
  useEffect,
  FC,
  ChangeEvent,
  FormEvent
} from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@material-ui/core';
import { API, Storage } from 'aws-amplify';

import LoaderButton from '../../components/LoaderButton';

import { s3Upload } from '../../libs/awsLib';

import config from '../../config/aws.config';

import { useNotesStyle } from './Notes.style';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeNoteAction,
  clearNoteStateAction
} from '../../store/reducers/note';
import {
  selectNoteRemoving,
  selectNoteRemoved,
  selectNoteRemoveError
} from '../../store/selector/note';

export interface INotes {
  useId: string;
  noteId: string;
  content: string;
  createdAt: number;
  attachment?: string;
  attachmentURL?: string;
}

const Notes: FC<RouteComponentProps<{ id: string }>> = ({ history, match }) => {
  const { push: historyPush } = history;

  const classes = useNotesStyle();
  const dispatch = useDispatch();
  const file = useRef<File | null>(null);

  const removing = useSelector(selectNoteRemoving);
  const removed = useSelector(selectNoteRemoved);
  const removeError = useSelector(selectNoteRemoveError);

  const [note, setNote] = useState<INotes | null>(null);
  const [fileName, setFileName] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadNote = () => API.get('notes', `/notes/${match.params.id}`, null);

    const onLoad = async () => {
      try {
        const note = await loadNote();
        const { content, attachment } = note;

        if (attachment) {
          note.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(content);
        setNote(note);
      } catch (e) {
        alert(e);
      }
    };

    onLoad();
  }, [match.params.id]);

  useEffect(() => {
    if (removed) {
      historyPush('/');
      dispatch(clearNoteStateAction('remove'));
    }
  }, [removed, historyPush, dispatch]);

  useEffect(() => {
    if (removeError) alert(removeError);
  }, [removeError]);

  const validateForm = () => content.length > 0;
  const formatFilename = (str: string) => str.replace(/^\w+-/, '');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    file.current = event.target.files[0];
    setFileName(file.current.name);
  };

  const saveNote = (note: { content: string; attachment?: string }) =>
    API.put('notes', `/notes/${match.params.id}`, {
      body: note
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let attachment;

    if (!note) return;

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveNote({
        content,
        attachment: attachment || note.attachment
      });
      historyPush('/');
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
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
                color="primary"
                type="submit"
                variant="contained"
                isLoading={isLoading}
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
