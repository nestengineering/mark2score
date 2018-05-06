import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Dialog, { DialogContent, DialogTitle } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';

import util from '../util';

const styles = {
  flex: {
    flex: 1,
  },
  closeBtn: {
    marginLeft: 'auto',
    marginRight: 20,
  },
  content: {
    flex: 'initial',
  },
  block: {
    fontSize: 22,
    margin: 5,
  },
};

function HelpDialog(props) {
  const { open, onClose, classes } = props;
  return (
    <Dialog
      fullScreen={util.isMobile()}
      open={open}
      onClose={onClose}
    >
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            <i className="fa fa-question-circle-o" aria-hidden="true" />
            　ヘルプ
          </Typography>
          <IconButton className={classes.closeBtn} onClick={onClose}>
            <i className="fa fa-times" aria-hidden="true" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
        <DialogTitle>this is help</DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container spacing={40}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="caption">
              help me!
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </div>
    </Dialog>
  );
}

HelpDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles, { withTheme: true })(HelpDialog);
