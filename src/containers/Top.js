import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';

import titleGr from '../images/title_gr.png';
import Footer from '../components/Footer';
import constants from '../constants';
import util from '../util';

const styles = theme => ({
  content: {
    paddingTop: util.isMobile ? '6em' : '3em',
    paddingBottom: '3em',
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: 960,
    margin: '0 auto',
  },
  textBox: {
    maxWidth: 600,
    margin: '0 auto',
  },
  bgTransparent: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
    display: 'block',
  },
  button: {
    margin: theme.spacing.unit,
  },
  center: {
    display: 'block',
    margin: '0 auto',
    textAlign: 'center',
  },
  stroke: {
    color: theme.palette.primary.light,
    WebkitTextStroke: `1px ${theme.palette.primary.main}`,
  },
});

function Top(props) {
  const { classes } = props;
  return (
    <Grid spacing={0} container alignItems="stretch" justify="center">
      <Grid item xs={12}>
        <Paper className={classes.center} square elevation={0}>
          <div className={classes.content}>
            <Typography className={classes.stroke} variant="display3" align="center" style={{ marginTop: '0.5em' }}>
              Automatically score mark seats.
            </Typography>
            <img style={{ margin: '2em 2em 2em 1.7em' }} src={titleGr} alt="Mark2score" height="40" />
            <Typography align="center" style={{ marginBottom: '2em' }}>
            Mark2scoreは家庭用のスキャナーを使ってマークシートを自動採点するWebサービスです。
            </Typography>
            <Link style={{ marginBottom: '1em', display: 'inline-block' }} className={classes.link} to="/signup">
              <Button variant="raised" className={classes.button} color="primary" >無料登録して始める</Button>
            </Link>
          </div>
        </Paper>
      </Grid>
      <Footer />
    </Grid>
  );
}

Top.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
  theme: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles, { withTheme: true })(Top);

