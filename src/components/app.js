import React, { PureComponent, PropTypes } from 'react';
import { MuiThemeProvider } from 'material-ui';
import HeaderTemplate from './template/header';
import FooterTemplate from './template/footer';

class App extends PureComponent {
  render() {
    return (
      <div>
        <HeaderTemplate logo="" />
        <div className="container">
          <MuiThemeProvider>
            {this.props.children}
          </MuiThemeProvider>
        </div>
        <FooterTemplate />
      </div>
    );
  }
}

export default App;
