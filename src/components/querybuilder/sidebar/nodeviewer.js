/* eslint-disable react/require-default-props,react/forbid-prop-types */
import React, { PropTypes, PureComponent } from 'react';

import styles from './styles';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

class NodeViewer extends PureComponent {
  render() {
    const style = styles.viewer;
    let json = JSON.stringify(this.props.node, null, 4);

    if (!json) {
      json = HELP_MSG;
    }

    return <div style={style.base}>{json}</div>;
  }
}

NodeViewer.propTypes = {
  node: PropTypes.object,
};
