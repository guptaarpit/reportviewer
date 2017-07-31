/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/5/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { AutoComplete } from 'material-ui';
import { fetchCUList, retrieveMetrics, renderDashboard } from '../../actions/dashboard';
import { CLIENT_ROOT_URL } from '../../actions/index';
import { SearchForm } from './searchForm';
import { SELECTED_CU } from '../../actions/types';

const form = reduxForm({
  form: 'search',
});

class Main extends Component {
  static filterAutoComplete(searchText, key) {
    if (searchText.length >= 3) {
      return AutoComplete.caseInsensitiveFilter(searchText, key);
    }

    return searchText.length === 0;
  }
  static renderAboutBlock() {
    return (
      <div className="col-sm-12 w3-container w3-center w3-margin-top">
        <div className="w3-padding-64">
          <span className="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">ABOUT</span>
        </div>
        <div className="w3-card-8 w3-padding w3-blue-grey">
          <p className="lead">
            CU-Benchmark is a platform which
            evaluates to Credit Unions, Core Vendors &
            Other financial institutions on customized scorecards &
            generates peer benchmarking reports.
          </p>
          <h4>
            We utilize information from National Credit Union
            Administration (NCUA 5300 reports) & IT infrastructure & processes data.
          </h4>
        </div>
      </div>
    );
  }

  static renderAutoComplete({
                              input,
                              label,
                              datasource,
                              onnewrequest,
                              meta: { touched, error },
                              ...custom
                            }) {
    return (
      <AutoComplete
        name="cuMain"
        floatingLabelText={label}
        errorText={touched && error}
        dataSource={datasource}
        filter={Main.filterAutoComplete}
        fullWidth
        onNewRequest={onnewrequest}
        style={{ width: '75%', margin: '0 15px 0 15px' }}
        className="form-control"
        id="cuName"
        {...input}
        {...custom}
      />
    );
  }

  static renderWhatWeOfferBlock() {
    return (
      <div className="col-sm-12 w3-container w3-center">
        <div className="w3-panel w3-row-padding">
          <div className="w3-padding-64">
            <span className="w3-xlarge w3-bottombar w3-border-dark-grey w3-padding-16">What We Offer</span>
          </div>
          <div className="col-sm-6 m6 s12 w3-padding-12 w3-sand w3-border w3-round-large w3-card-8">
            <h3 className="lead w3-bottombar text-info">ScoreCards</h3>
            <p className="w3-large">Key Performance Reporting & Strategic Planning</p>
            <a href="/dashboard" className="w3-btn w3-teal">Try Now</a></div>
          <div className="col-sm-6 m6 s12 w3-padding-12 w3-pale-yellow w3-border w3-round-large w3-card-8">
            <h3 className="lead w3-bottombar text-info">Benchmark</h3>
            <p className="w3-large">Create Your Peer Groups & Compare on Various Score-cards</p>
            <a href="/benchmark" className="w3-btn w3-teal">Try Now</a></div>
        </div>
        <div className="w3-container w3-row-padding">
          <div className="w3-col m6 l6 w3-center">
            <div className="w3-container w3-padding-16">
              <h4 className="w3-card-8 w3-padding-16 w3-cyan">Business Analytics</h4>
              <ul className="w3-ul w3-border">
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-dot-circle-o" />
                  </div>
                  <div className="w3-right w3-twothird"><p>PEARLS</p></div>
                </li>
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-snowflake-o" />
                  </div>
                  <div className="w3-right w3-twothird">
                    <p>CAMELS</p>
                  </div>
                </li>
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-usd" />
                  </div>
                  <div className="w3-right w3-twothird">
                    <p>Assets</p>
                  </div>
                </li>
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-credit-card" />
                  </div>
                  <div className="w3-right w3-twothird">
                    <p>Liabilities</p>
                  </div>
                </li>
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-money" />
                  </div>
                  <div className="w3-right w3-twothird">
                    <p>Income & Expense</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w3-col m6 l6 w3-center">
            <div className="w3-container w3-padding-16">
              <h4 className="w3-card-8 w3-padding-16 w3-yellow">
                IT Processes & Infrastructure
              </h4>
              <ul className="w3-ul w3-border">
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-dot-circle-o" />
                  </div>
                  <div className="w3-right w3-twothird">
                    <p>
                      Business Continuity Processes (BCP)
                    </p>
                  </div>
                </li>
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-snowflake-o" />
                  </div>
                  <div className="w3-right w3-twothird">
                    <p>
                      Total Cost of Ownership (TCO)
                    </p>
                  </div>
                </li>
                <li className="w3-col w3-card-8 w3-teal">
                  <div className="w3-left w3-third">
                    <i className="fa fa-credit-card" />
                  </div>
                  <div className="w3-right w3-twothird">
                    <p>
                      Disaster Recovery (DR)
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {Main.renderAboutBlock()}
      </div>
    );
  }

  componentDidMount() {
    this.props.fetchCUList();
    this.props.fetchMetrics();
  }
  handleFormSubmit(e) {
    console.log(e);
    this.props.renderReport(e, this.props.culist, this.props.selectedCU);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }

    return undefined;
  }

  render() {
    return (
      <div>
        <div className="col-sm-12 w3-card-8">
          <div className="w3-panel">
            <img
              alt="Company Logo"
              src="../../src/public/img/cu1.png"
              style={{ 'margin-left': '25px', 'margin-right': '25px' }}
              className="w3-center"
            />
            <div className="w3-clear" />
            <h4 className="text-info lead w3-center">A unique platform to learn & compare about Credit Unions</h4>
          </div>
          <SearchForm
            onSubmit={e => this.handleFormSubmit(e)}
            renderAutoComplete={Main.renderAutoComplete}
            culist={this.props.culist}
            renderAlert={this.renderAlert}
            selectedItem={this.props.selectedItem}
            filterAutoComplete={Main.filterAutoComplete}
          />
        </div>
        {Main.renderWhatWeOfferBlock()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    culist: state.cu.culist,
    errorMessage: state.cu.error,
    selectedCU: state.cu.selectedCU,
  };
}

const mapDispatchToProps = dispatch => ({
  selectedItem: (chosenRequest) => {
    dispatch({
      type: SELECTED_CU,
      payload: chosenRequest,
    });

    dispatch(renderDashboard(chosenRequest.cuNumber));
  },
  fetchMetrics: () => dispatch(retrieveMetrics()),
  renderReport: () => {
    window.location.href = `${CLIENT_ROOT_URL}/chart`;
  },
  fetchCUList: () => dispatch(fetchCUList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(form(Main));

