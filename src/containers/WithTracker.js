import React, { Component } from 'react';
import GoogleAnalytics from 'react-ga';
import PropTypes from 'prop-types';
import constants from '../constants';

GoogleAnalytics.initialize(constants.GA_ID, {
  debug: process.env.NODE_ENV === 'development',
  titleCase: false,
});


const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    GoogleAnalytics.set({
      page,
      ...options,
    });
    GoogleAnalytics.pageview(page);
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname; // eslint-disable-line
      trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};
withTracker.propTypes = {
  location: PropTypes.objectOf(PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  })).isRequired,
};
export default withTracker;
