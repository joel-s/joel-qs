import React, { Component } from 'react';
import { Redirect } from 'react-router';

/**
 * Reload site and redirect to "/".
 * Before routing to this component, set window._needToReload_ to true.
 */
class ReloadSite extends Component {
  render() {
    if (window._needToReload_ === true) {
      // Reload the site: will route to "/reload"
      window.location.reload();
    }

    return <Redirect to="/" push />
  }
}

export default ReloadSite;
