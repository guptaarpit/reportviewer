/**
 * Created by arpit on 7/11/2017.
 */
/**
 * Created by arpit on 7/5/2017.
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector, Field } from 'redux-form';
import { AutoComplete } from 'material-ui';

const form = reduxForm({
  form: 'searchForm',
});

const LoginForm = form((props) => {
  const { handleSubmit, handleChange, renderAlert } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div className="alert-warning">
        {renderAlert}
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
              onBlur={e => handleChange(e)}
            />
            <i className="ace-icon fa fa-user" />
          </span>
        </label>

        <label className="col-sm-3 control-label" htmlFor="password">
          <span className="block input-icon input-icon-right">
            <Field name="password" className="form-control" id="password" component="input" type="password" />
            <i className="ace-icon fa fa-lock" />
          </span>
        </label>
        <div className="space" />
        <div className="clearfix">
          <button type="submit" className="width-35 pull-right btn btn-sm btn-primary">
            <i className="ace-icon fa fa-key" />
            <span className="bigger-110">Login</span>
          </button>
        </div>
        <div className="space-4" />
      </fieldset>
    </form>
  );
});
const selector = formValueSelector('searchForm'); // <-- same as form name
const searchForm = connect((state) => {
  // can select values individually
  const cuName = selector(state, 'cuMain');
  return {
    cuName,
  };
})(LoginForm);
module.exports = {
  SearchForm: LoginForm,
  searchForm,
};

