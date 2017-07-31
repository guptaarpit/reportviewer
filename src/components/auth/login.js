/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ioClient from 'socket.io-client';
import { loginUser } from '../../actions/auth';

const form = reduxForm({
  form: 'login',
});

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
    };
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  handleChange(e) {
    const socket = ioClient.connect('http://localhost:3001');
    socket.emit('validate email', e.target.value);
    socket.on('new email', (msg) => {
      this.setState({ errorMessage: msg });
    });
    socket.on('email exist', () => {
      this.setState({ errorMessage: '' });
    });
  }

  renderAlert() {
    if (this.state.errorMessage) {
      return (
        <span className="text-center"><i className="fa fa-warning" /> {this.state.errorMessage}</span>
      );
    }

    return <span />;
  }

  render() {
    return (
      <div className="login-container">
        <div className="position-relative">
          <div id="login-box" className="login-box visible widget-box          no-border">
            <div className="widget-body">
              <div className="widget-main">
                <h4 className="header blue lighter bigger">
                  <i className="ace-icon fa fa-coffee green" />
                  Please Enter Your Information
                </h4>
                <div className="space-6" />
                <form onSubmit={this.handleSubmit}>
                  <div className="alert-warning">
                    {this.renderAlert}
                  </div>
                  <fieldset>
                    <label className="block clearfix" htmlFor="email">
                      <span className="block input-icon input-icon-right">
                        <Field
                          name="email"
                          className="form-control"
                          id="email"
                          component="input"
                          type="text"
                          placeholder="Username"
                          onBlur={e => this.handleChange(e)}
                        />
                        <i className="ace-icon fa fa-user" />
                      </span>
                    </label>
                    <label className="block clearfix" htmlFor="password" >
                      <span className="block input-icon input-icon-right">
                        <Field
                          name="password"
                          className="form-control"
                          id="password"
                          component="input"
                          type="password"
                        />
                        <i className="ace-icon fa fa-lock" />
                      </span>
                    </label>
                    <div className="space" />
                    <div className="clearfix">
                      <button type="submit" className="width-35 pull-right btn btn-sm btn-primary" >
                        <i className="ace-icon fa fa-key" />
                        <span className="bigger-110">Login</span>
                      </button>
                    </div>
                    <div className="space-4" />
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
