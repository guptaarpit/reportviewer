/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/5/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import { fetchCUList, renderDashboard } from '../../actions/dashboard';
import { SELECTED_CU, FIRSTQTR, SECONDQTR, LIST } from '../../actions/types';
import Widgets from './widget';
import TableRows from './tableRow';

class Main extends Component {
  componentDidMount() {
    console.log(this.props.selectedCU);
    this.props.renderReport(this.props.selectedCU);
  }

  prepareData(metricItem) {
    const chartData = this.props.assets.map(item => item[metricItem.Metric]);
    return {
      barData: {
        data: {
          labels: this.props.assets.map(item => item.Quarter),
          datasets: [
            {
              label: metricItem.Caption,
              backgroundColor: 'rgba(0,60,100,0.5)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(0,60,100,1)',
              data: chartData,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: false,
                ticks:
                {
                  display: false,
                },
              },
            ],
            legend:
            {
              display: false,
            },
            yAxes: [
              {
                display: false,
                type: 'linear',
                ticks:
                {
                  display: false,
                  beginAtZero: true,
                  callback(value) {
                    return numeral(value).format(metricItem.format);
                  },
                },
              }],
          },

        },
      },
      itemData: this.props.assets,
      metrics: metricItem,
    };
  }

  prepareKnobData(metricItem) {
    const metricValue = this.props[metricItem.Heading][0] ? numeral(this
        .props[metricItem.Heading][0][metricItem.Metric]).value() : 0;
    const statePercentile = this.props
        .assetbandstatepercentile[0] ? numeral(this.props
        .assetbandstatepercentile[0][metricItem.StatePercentileMetric]).value() : 0;
    const assetBandPercentile = this.props
        .assetbandstatepercentile[0] ? numeral(this.props
        .assetbandstatepercentile[0][metricItem.AssetBandPercentileMetric]).value() : 0;
    return {
      MetricPercentile: metricValue,
      StatePercentile: statePercentile,
      AssetBandPercentile: assetBandPercentile,
      Caption: metricItem.Caption,
    };
  }

  renderTableRow() {
    return this.props.metrics.map((item) => {
      const propertyCheck = Object.prototype.hasOwnProperty.call(this.props.assets[0], item.Metric);
      if (propertyCheck && item.Drawable === 'TRUE') {
        const tableData = this.prepareData(item);
        return (<TableRows
          barData={tableData.barData}
          itemData={tableData.itemData}
          metrics={tableData.metrics}
        />);
      }

      return '';
    });
  }

  renderWidgets() {
    return this.props.scorecardmetrics.map((item) => {
      const widgetData = this.prepareKnobData(item);
      return (<Widgets
        widgetData={widgetData}
        parentProps={this.props}
      />);
    });
  }

  render() {
    this.props.renderReport(this.props.selectedCU);
    return (
      <div>
        <div className="col-sm-12 text-center">
          <div className="col-sm-12 text-info">
            <h4 className="lead">Browse Score - cards</h4>
            <hr />
          </div>
        </div>
        <div className="col-sm-12">
          <h3 className="text-info w3-center">
            <u className="Heading">{this.props.selectedCU.name}</u>
          </h3>
          <p />
          <div className="nav-tabs-custom w3-card-8 bg-gray">
            <ul className="nav nav-tabs">
              <li className="active">
                <Link to="#tabs-1" data-toggle="tab" className="h4">
                  Business Analytics
                </Link>
              </li>
              <li>
                <Link to="#tabs-2" data-toggle="tab" className="h4">
                  IT Processes & Infrastructure
                </Link>
              </li>
            </ul>
            <div className="tab-content">
              <div id="tabs-1" className="tab-pane active">
                <div className="nav-tabs-custom bg-gray">
                  <ul className="nav nav-tabs">
                    <li className="">
                      <Link to="#sc1" id="tabDa1" data-toggle="tab" aria-expanded="false">
                        Overall
                      </Link>
                    </li>
                    <li className="active">
                      <Link to="#sc2" id="tabDa2" data-toggle="tab" aria-expanded="true">
                        Assets
                      </Link>
                    </li>
                    <li>
                      <Link to="#sc3" id="tabDa3" data-toggle="tab">
                        Liabilities
                      </Link>
                    </li>
                    <li>
                      <Link to="#sc4" id="tabDa4" data-toggle="tab">
                        Income & Expense
                      </Link>
                    </li>
                    <li>
                      <Link to="#sc5" id="tabDa5" data-toggle="tab">
                        PEARLS*
                      </Link>
                    </li>
                    <li>
                      <Link to="#sc6" id="tabDa6" data-toggle="tab">
                        CAMELS*
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content bg-gray">
                    <div id="sc2" className="tab-pane active">
                      <button style={{ 'margin-top': '-6.5%', 'margin-right': '1%' }} className="btn-success btn-xs pull-right">
                        <i className="fa fa-print fa-lg" />
                        <span>Print PDF</span>
                      </button>
                      <div className="panel panel-primary">
                        <div className="panel-heading text-center bg-aqua">
                          <p style={{ 'font-size': '25px', margin: 0 }} className="lead">
                            Assets Scorecard
                          </p>
                        </div>
                        <div className="panel-body">
                          <div className="w3-row w3-center">
                            <div className="w3-col w3-half MainSC">
                              <p className="lead">Name of CU :
                                <span className="text-info lead">
                                  {this.props.selectedCU.name}
                                </span>
                              </p>
                              <p className="lead">State :
                                <span className="text-info lead">
                                  CALIFORNIA
                                </span>
                              </p>
                              <p className="lead">Members :
                                <span className="text-info lead">
                                  XXXX
                                </span>
                              </p>
                            </div>
                            <div className="w3-col w3-half">
                              <p className="lead">Assets :
                                <span className="text-info lead" >
                                  $ XXX B
                                </span>
                              </p>
                              <p className="lead">Asset Band :
                                <span className="text-info lead" >
                                  $ XX - XX B
                                </span>
                              </p>
                              <p className="lead">Loans :
                                <span className="text-info lead">
                                  $ XXX B
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="box box-info">
                            <div className="box-header with-border">
                              <h3 className="box-title">Key Metrics</h3>
                              <div className="box-tools pull-right">
                                <button
                                  type="button"
                                  data-widget="collapse"
                                  className="btn btn-box-tool"
                                >
                                  <i className="fa fa-minus" />
                                </button>
                              </div>
                            </div>
                            <div style={{ display: 'block' }} className="box-body well">
                              <div className="w3-row">
                                <p className="lead w3-card-8 w3-center w3-cyan">
                                  Scorecard Metrics
                                </p>
                              </div>
                              <div className="w3-row w3-row-padding">
                                {this.renderWidgets()}
                              </div>
                            </div>
                          </div>
                          <div className="box box-info">
                            <div className="box-header with-border">
                              <h3 className="box-title">
                                Quarter wise comparison
                              </h3>
                              <div className="box-tools pull-right">
                                <button
                                  type="button"
                                  data-widget="collapse"
                                  className="btn btn-box-tool"
                                >
                                  <i className="fa fa-minus" />
                                </button>
                              </div>
                            </div>
                            <div style={{ display: 'block' }} className="box-body well">
                              <table style={{ width: '100%', 'text-align': 'center' }} className="well nav nav-stacked table table-inverse text-center">
                                <thead>
                                  <tr className="w3-cyan text-center">
                                    <th className=" text-center">Metric</th>
                                    <th data-toggle="modal" data-target="#modal" className="text-center PeriodN">
                                      This Quarter
                                    </th>
                                    <th data-toggle="modal" data-target="#modal" className="text-center PeriodO">
                                      Past Quarter
                                    </th>
                                    <th className="PeriodC text-center">Change</th>
                                    <th className="text-center">Trend</th>
                                    <th className="text-red text-center">Delete</th>
                                  </tr>
                                </thead>
                                <tbody id="ASSETS">
                                  {this.renderTableRow()}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="tabs-2" className="tab-pane">
                <div className="nav-tabs-custom bg-gray">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <Link to="#it2" id="tabIT2" data-toggle="tab">Business Continuity Planning
            (BCP)</Link>
                    </li>
                    <li>
                      <Link to="#it3" id="tabIT3" data-toggle="tab">Total Cost of Ownership (TCO)</Link>
                    </li>
                    <li>
                      <Link to="#it4" id="tabIT4" data-toggle="tab">Disaster Recovery (DR)</Link>
                    </li>
                  </ul>
                  <div className="tab-content bg-gray">
                    <div id="it2" className="tab-pane active">
                      <button
                        style={{ 'margin-top': '-6.5%', 'margin-right': '1%' }}
                        className="btn-success btn-xs pull-right"
                      >
                        <i className="fa fa-print fa-lg" />
                        <span>Print PDF</span>
                      </button>
                      <div className="panel panel-primary">
                        <div className="panel-heading text-center bg-yellow">
                          <p style={{ 'font-size': '18px', margin: '0' }} className="lead"> Business Continuity
                  Practises (BCP) Scorecard</p>
                        </div>
                        <div className="panel-body text-center">
                          <br />
                          <h4>Please upgrade your account to ITExpert
                or SuperUser</h4>
                          <Link to="http://localhost:8080/pricing" className="w3-btn w3-teal">Upgrade
                Now</Link>
                        </div>
                      </div>
                    </div>
                    <div id="it3" className="tab-pane">
                      <button
                        style={{ 'margin-top': '-6.5%', 'margin-right': '1%' }}
                        className="btn-success btn-xs pull-right"
                      >
                        <i className="fa fa-print fa-lg" />
                        <span>Print PDF</span>
                      </button>
                      <div className="panel panel-primary">
                        <div className="panel-heading text-center bg-yellow">
                          <p style={{ 'font-size': '18px', margin: '0' }} className="lead"> Total Cost of Ownership
                  (TCO) Scorecard</p>
                        </div>
                        <div className="panel-body text-center">
                          <br />
                          <h4>Please upgrade your account to ITExpert
                or SuperUser</h4>
                          <Link to="http://localhost:8080/pricing" className="w3-btn w3-teal">Upgrade
                Now</Link>
                        </div>
                      </div>
                    </div>
                    <div id="it4" className="tab-pane">
                      <button style={{ 'margin-top': '-6.5%', 'margin-right': '1%' }} className="btn-success btn-xs pull-right">
                        <i className="fa fa-print fa-lg" />
                        <span>Print PDF</span>
                      </button>
                      <div className="panel panel-primary">
                        <div className="panel-heading text-center bg-yellow">
                          <p style={{ 'font-size': '18px', margin: '0' }} className="lead"> Disaster Recovery (DR) Scorecard</p>
                        </div>
                        <div className="panel-body text-center">
                          <br />
                          <h4>Please upgrade your account to ITExpert
                or SuperUser</h4>
                          <Link to="http://localhost:8080/pricing" className="w3-btn w3-teal">Upgrade
                Now</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    selectedCU: state.cu.selectedCU,
    scorecardmetrics: state.cu.scorecardmetrics,
    assets: state.cu.assets,
    liabilities: state.cu.liabilities,
    keyparams: state.cu.keyparams,
    camels: state.cu.camels,
    assetbandstatepercentile: state.cu.assetbandstatepercentile,
    pearls: state.cu.pearls,
    incomeexpenses: state.cu.incomeexpenses,
    metrics: state.cu.metrics,
  };
}

const mapDispatchToProps = dispatch => ({
  selectedItem: chosenRequest => dispatch({
    type: SELECTED_CU,
    payload: chosenRequest,
  }),
  selectFirstQtr: (event, index, value) => dispatch({
    type: FIRSTQTR,
    payload: value,
  }),
  selectSecondQtr: (event, index, value) => dispatch({
    type: SECONDQTR,
    payload: value,
  }),
  renderFirstQtrList: list => dispatch({
    type: `${FIRSTQTR}${LIST}`,
    payload: list,
  }),
  renderSecondQtrList: list => dispatch({
    type: `${SECONDQTR}${LIST}`,
    payload: list,
  }),
  renderReport: (selectedCU) => {
    dispatch(renderDashboard(selectedCU.cuNumber));
  },
  fetchCUList: () => dispatch(fetchCUList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

