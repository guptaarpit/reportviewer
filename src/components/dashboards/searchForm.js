/**
 * Created by arpit on 7/11/2017.
 */
/**
 * Created by arpit on 7/5/2017.
 */

import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import { AutoComplete } from 'material-ui';

const form = reduxForm({
  form: 'searchForm',
});

const SearchForm = form((props) => {
  const { handleSubmit, culist, renderAlert, selectedItem, filterAutoComplete } = props;
  return (<form onSubmit={handleSubmit} >
    {renderAlert}
    <div style={{ margin: '10px' }}>
      <div
        style={{ width: '4%', height: '72px', 'padding-top': '25px' }}
        className="w3-col l3 w3-border-aqua"
      >
        <i className="w3-xxlarge fa fa-university" />
      </div>
      <AutoComplete
        name="cuMain"
        dataSource={culist}
        onNewRequest={selectedItem}
        dataSourceConfig={{ text: 'name', value: 'cuNumber' }}
        floatingLabelText="Your CU Name"
        filter={filterAutoComplete}
        fullWidth
        id="cuName"
        style={{ width: '75%', margin: '0 15px 0 15px' }}
      />
      <button type="submit" className="btn btn-warning btn-circle" style={{ 'margin-bottom': '5px' }}>SEARCH <span className="fa fa-search" /></button>
    </div>
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
})(SearchForm);
module.exports = {
  SearchForm,
  searchForm,
};

