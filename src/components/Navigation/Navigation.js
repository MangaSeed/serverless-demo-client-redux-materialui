import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import { useAppStyles } from './Navigation.style';

export function Navigation({ children }) {
  const classes = useAppStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.appBarHeader}>
          SCRATCH
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
}
