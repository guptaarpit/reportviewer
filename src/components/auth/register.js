import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ioClient from 'socket.io-client';
import { registerUser } from '../../actions/auth';

const renderField = field => (
  <div>
    <input className="form-control" {...field.input} />
    {field.touched && field.error && <div className="error"><i className="fa fa-remove" />{field.error}</div>}
  </div>
);

function validate(formProps) {
  const errors = {};

  if (!formProps.name) {
    errors.name = 'Please enter a first name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a valid password';
  }

  if (!formProps.confirm_password) {
    errors.confirm_password = 'Please enter the password again';
  } else if (formProps.password !== formProps.confirm_password) {
    errors.confirm_password = 'Password doesn\'t match';
  }

  return errors;
}

const form = reduxForm({
  form: 'register',
  validate,
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      errorMessage: '',
    };
  }

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  handleChange(e) {
    const socket = ioClient.connect('http://localhost:3001');
    socket.emit('validate email', e.target.value);
    socket.on('new email', () => {
      this.setState({ errorMessage: '' });
    });
    socket.on('email exist', (msg) => {
      this.setState({ errorMessage: msg });
    });
  }

  renderAlert() {
    if (this.state.errorMessage) {
      return (
        <span className="text-center"><i className="fa fa-warning" />{this.state.errorMessage}</span>
      );
    }

    return <span />;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="well form-horizontal" onSubmit={e => handleSubmit(this.handleFormSubmit(e))} id="contact_form">
        <legend><h2 className="text-center"><b>Registration Form</b></h2></legend>
        <div className="alert-warning">
          {this.renderAlert()}
        </div>
        <div className="form-group">
          <label htmlFor="name" className="col-md-4 control-label">Name</label>
          <div className="col-md-4 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-user" />
              </span>
              <Field name="name" label="Full Name" className="form-control" component={renderField} type="text" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="email">Username</label>
          <div className="col-md-4 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon">
                <i className="fa fa-envelope" /></span>
              <Field name="email" label="Email Address" className="form-control" component={renderField} type="text" onChange={this.handleChange} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="password" >Password</label>
          <div className="col-md-4 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-lock" /></span>
              <Field name="password" label="Password" className="form-control" type="password" component={renderField} />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="col-md-4 control-label" htmlFor="confirm_password">Confirm Password</label>
          <div className="col-md-4 inputGroupContainer">
            <div className="input-group">
              <span className="input-group-addon"><i className="fa fa-lock" /></span>
              <Field name="confirm_password" label="Confirm Password" className="form-control" type="password" component={renderField} onblur />
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-6 col-sm-offset-4">
              <button type="submit" className="btn btn-warning">SUBMIT <span className="fa fa-send" /></button>
            </div>
          </div>
        </div>
      </form>
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

export default connect(mapStateToProps, { registerUser })(form(Register));
