/* eslint-disable react/forbid-prop-types */
import React from 'react';
import ReactDOM from 'react-dom';
import { StyleRoot } from 'radium';
import { Treebeard, decorators } from 'react-treebeard';

import data from './data';
import styles from './styles';
import * as filters from './filter';
import NodeViewer from './nodeviewer';

// Example: Customising The Header Decorator To Include Icons
/* decorators.Header = ({ style, node }) => {
  const iconType = node.children ? 'folder' : 'file-text';
  const iconClass = `fa fa-${iconType}`;
  const iconStyle = { marginRight: '5px' };

  return (
    <div style={style.base}>
      <div style={style.title}>
        <i className={iconClass} style={iconStyle} />

        {node.name}
      </div>
    </div>
  );
}; */

class DemoTree extends React.Component {
  constructor() {
    super();

    this.state = { data };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    const toggledNode = node;
    const { cursor } = this.state;

    if (cursor) {
      cursor.active = false;
    }

    toggledNode.active = true;
    if (node.children) {
      toggledNode.toggled = toggled;
    }

    this.setState({ cursor: toggledNode });
  }

  onFilterMouseUp(e) {
    const filter = e.target.value.trim();
    if (!filter) {
      return this.setState({ data });
    }
    let filtered = filters.filterTree(data, filter);
    filtered = filters.expandFilteredNodes(filtered, filter);
    return this.setState({ data: filtered });
  }

  render() {
    const { data: stateData, cursor } = this.state;

    return (
      <StyleRoot>
        <div style={styles.searchBox}>
          <div className="input-group">
            <span className="input-group-addon">
              <i className="fa fa-search" />
            </span>
            <input
              className="form-control"
              onKeyUp={e => this.onFilterMouseUp(e)}
              placeholder="Search the tree..."
              type="text"
            />
          </div>
        </div>
        <div style={styles.component}>
          <Treebeard
            data={stateData}
            decorators={decorators}
            onToggle={this.onToggle}
          />
        </div>
        <div style={styles.component}>
          <NodeViewer node={cursor} />
        </div>
      </StyleRoot>
    );
  }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree />, content);
