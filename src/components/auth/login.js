import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ioClient from 'socket.io-client';
import { Link } from 'react-router';
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
      <div>
        <div className="page-header"><h3>Sign in</h3></div>
        <form className="form-horizontal" onSubmit={this.handleFormSubmit}>
          <div className="alert-warning">
            {this.renderAlert()}
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label" htmlFor="email">Email</label>
            <div className="col-sm-7">
              <Field
                name="email"
                className="form-control"
                id="email"
                component="input"
                type="text"
                onBlur={e => this.handleChange(e)}
              />
            </div>

            <label className="col-sm-3 control-label" htmlFor="password">Password</label>
            <div className="col-sm-7">
              <Field name="password" className="form-control" id="password" component="input" type="password" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-3 col-sm-7">
              <button type="submit" className="btn btn-primary"> Login
              </button >
              <Link to="/forgot-password"> Forgot Password ? </Link>
            </div>
          </div>
        </form>
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
