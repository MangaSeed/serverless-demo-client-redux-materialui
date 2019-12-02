import React, { useEffect, Fragment, FC } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { NoteAdd as NoteAddIcon } from '@material-ui/icons';

import { INote, fetchNoteListAction } from '../../store/reducers/note';

import {
  selectNoteListData,
  selectNoteListFetching,
  selectNoteListError,
} from '../../store/selector/note';

import { IAppProps } from '../../Routes';

import { useHomeStyle } from './Home.style';
import { useDispatch, useSelector } from 'react-redux';

const Home: FC<IAppProps> = ({ checkedAuth }) => {
  const classes = useHomeStyle();
  const dispatch = useDispatch();

  const notes = useSelector(selectNoteListData);
  const fetchingList = useSelector(selectNoteListFetching);
  const listError = useSelector(selectNoteListError);

  useEffect(() => {
    if (checkedAuth) dispatch(fetchNoteListAction());
  }, [checkedAuth, dispatch]);

  useEffect(() => {
    if (listError) alert(listError);
  }, [listError]);

  const renderNotesList = (notes: INote[]) => {
    return (
      <List id="notes">
        <ListItem button component={Link} to="/notes/new">
          <ListItemIcon>
            <NoteAddIcon />
          </ListItemIcon>
          <ListItemText primary="Create a new note" />
        </ListItem>
        {Boolean(notes.length) && <Divider />}
        {notes.map((note, i) => (
          <Fragment key={note.noteId}>
            <ListItem component={Link} to={`/notes/${note.noteId}`} button>
              <ListItemText
                primary={note.content.trim().split('\n')[0]}
                secondary={
                  'Created: ' + new Date(note.createdAt).toLocaleString()
                }
              />
            </ListItem>
            {Boolean(notes.length !== i + 1) && <Divider />}
          </Fragment>
        ))}
      </List>
    );
  };

  const renderLander = () => {
    return (
      <Box className={classes.lander}>
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </Box>
    );
  };

  const renderNotes = () => {
    return (
      <Box>
        <h1>Your Notes</h1>
        {fetchingList ? (
          <Grid container justify="center">
            <Box p={10}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : (
          renderNotesList(notes)
        )}
      </Box>
    );
  };

  return checkedAuth ? renderNotes() : renderLander();
};

export default Home;
