import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import constants from '../constants';

const styles = {
  root: {
    width: constants.APPWIDTH,
    margin: '0 auto',
  },
  content: {
    padding: '6em 2em',
    maxWidth: constants.APPWIDTH,
    margin: '0 auto',
  },
};


class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Grid className={this.props.classes.root} container spacing={0} alignItems="stretch">
        <Grid item xs={12}>
          <div style={{ minHeight: '100vh' }}>
            <div className={this.props.classes.content}>
              this is core your id is {this.props.userId}
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Core.propTypes = {
  userId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired, // eslint-disable-line
  theme: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles, { withTheme: true })(Core);
