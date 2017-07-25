/**
 * Created by arpit on 7/5/2017.
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { AutoComplete } from 'material-ui';
import request from 'request';

const form = reduxForm({
  form: 'cuNameSelect',
});

class HeaderTemplate extends Component {
  static renderAutoComplete({
                              label,
                              datasource,
                              meta: { touched, error },
                            }) {
    return (
      <AutoComplete
        floatingLabelText={label}
        filter={AutoComplete.caseInsensitiveFilter}
        errorText={touched && error}
        dataSource={datasource}
        dataSourceConfig={{ text: 'name', value: 'cuNumber' }}
        fullWidth
        className="form-control"
      />
    );
  }

  constructor() {
    super();
    this.state = {
      authenticated: false,
      errorMessage: '',
    };
  }

  componentDidMount() {
    const option = {
      baseUrl: 'http://localhost:3001/api',
      url: 'user/cunames',
      headers: {
        authorization: 'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IkJoYXVtaWsiLCJnZW5kZXIiOiJtYWxlIiwibG9jYXRpb24iOiIiLCJkZXNpZ25hdGlvbiI6IiIsIm9yZ2FuaXphdGlvbiI6IiIsIndlYnNpdGUiOiIiLCJhY2Nlc3NMZXZlbCI6InByZW1pdW0iLCJlbWFpbCI6ImJoYXVtaWtAZXhsc2VydmljZS5jb20iLCJjcmVhdGVkQXQiOiIyMDE3LTA3LTA0VDA4OjAxOjAyLjAwMFoiLCJzdGF0dXMiOiJhY3RpdmUiLCJwYXNzd29yZFJlc2V0VG9rZW4iOm51bGwsInBhc3N3b3JkUmVzZXRFeHBpcmVzIjpudWxsLCJ1cGRhdGVkQXQiOiIyMDE3LTA3LTA0IiwiaWF0IjoxNDk5Njk0NTI5LCJleHAiOjE1MDExOTQ4NzE0NzF9.Oc7GvsAmV43p16J_BMqCcPFld5xHLAaxrJfGjoUcRyTSFdvabQXQKxgsSuMFophRVPhHWrmkyce-GRHdUXkpl52bHKp7o_Fi5aWm3fw0SIpdE_1IGKGlYhkncC-ZlL2kvX_wDV1bblW8u7gjafiuvb25DKJ2OAJxl9djhrpsnCU',
      },
      method: 'GET',
    };
    request(option, (err, response, body) => {
      if (err) {
        this.setState({ errorMessage: err });
      }

      this.setState({ autoCompleteData: JSON.parse(body) });
    });
  }

  renderLinks() {
    const linkItems = {
      main: [
        <li key={`${1}header`}>
          <Link to="/" className="w3-btn w3-light-gray">Home</Link>
        </li>,
        <li key={`${2}header`}>
          <Link to="dashboard" className="w3-btn w3-light-gray">Dashboard</Link>
        </li>,
        <li key={`${3}header`}>
          <Link to="benchmark" className="w3-btn w3-light-gray">Benchmark</Link>
        </li>,
        <li key={`${4}header`}>
          <Link to="services" className="w3-btn w3-light-gray">Services</Link>
        </li>,
        <li key={`${5}header`}>
          <Link to="schedule" className="w3-btn w3-light-gray">Scheduler</Link>
        </li>,
        <li key={`${6}header`}>
          <Link to="contact" className="w3-btn w3-light-gray">Contact</Link>
        </li>,
      ],
      right: [],
    };
    if (this.state.authenticated) {
      linkItems.right = [
        <li key={`${3}header`}>
          <Link to="logout" className="w3-btn w3-sand">Logout</Link>
        </li>,
      ];
    } else {
      linkItems.right = [
        <li key={2}>
          <Link to="login" className="w3-btn w3-sand">Login</Link>
        </li>,
        <li key={3}>
          <Link to="register" className="w3-btn w3-sand">Register</Link>
        </li>,
      ];
    }

    return linkItems;
  }

  renderAlert() {
    if (this.state.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.state.errorMessage}</span>
        </div>
      );
    }

    return undefined;
  }

  renderSearchForm() {
    return (
      <form className="search-form">
        {this.renderAlert()}
        <div className="form-group has-feedback">
          <label htmlFor="search" className="sr-only">Search</label>
          <Field
            datasource={this.state.autoCompleteData}
            type="text"
            className="form-control"
            name="search"
            id="search"
            placeholder="search"
            component={HeaderTemplate.renderAutoComplete}
          />
          <span className="fa fa-search form-control-feedback" />
        </div>
      </form>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                data-toggle="collapse"
                data-target=".navbar-collapse"
                className="navbar-toggle"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/"><img
                alt="Company Logo"
                src="../../src/public/img/cu1.png"
                style={{ 'margin-left': '25px', 'margin-right': '25px' }}
                className="w3-center"
              /></Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                {this.renderLinks().main}
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {/* {this.renderSearchForm()}*/}
                {this.renderLinks().right}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(HeaderTemplate);
