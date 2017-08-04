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
import ChartTable from './charttable';

class Main extends Component {
  static prepareData(metricItem, keyparams) {
    const chartData = keyparams.map(item => item[metricItem.Metric]);
    const colors = chartData.map(value => (value < 0 ? 'rgba(60,0,0,0.5)' : 'rgba(0,60,0,0.5)'));
    const hoverColor = chartData.map(value => (value < 0 ? 'rgba(60,0,0,1)' : 'rgba(0,60,0,1)'));
    return {
      barData: {
        data: {
          labels: keyparams.map(item => item.Quarter),
          datasets: [
            {
              label: metricItem.Caption,
              backgroundColor: colors,
              borderWidth: 1,
              hoverBackgroundColor: hoverColor,
              data: chartData,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: false,
                ticks: {
                  display: false,
                },
              },
            ],
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
      itemData: keyparams,
      metrics: metricItem,
    };
  }

  static renderTableRow(metrics, keyparams, next) {
    return metrics.map((item) => {
      const propertyCheck = Object.prototype.hasOwnProperty.call(keyparams[0], item.Metric);
      if (propertyCheck && item.Drawable === 'TRUE') {
        const tableData = next(item, keyparams);
        return (<TableRows
          barData={tableData.barData}
          itemData={tableData.itemData}
          metrics={tableData.metrics}
        />);
      }

      return '';
    });
  }

  onFromQtrChange(e) {
    this.props.changeFromQtr(e.target.value);
  }

  onToQtrChange(e) {
    this.props.changeToQtr(e.target.value);
  }

  prepareKnobData(metricItem) {
    const currentQuarterMetric = this.props[metricItem.Heading]
        .find(item => item.Quarter === this.props.toQuarter);
    const currentABSPercentile = this.props.assetbandstatepercentile
        .find(item => item.Quarter === this.props.toQuarter);
    const metricValue = currentQuarterMetric ?
        numeral(currentQuarterMetric[metricItem.Metric]).value() : 0;
    const statePercentile = currentABSPercentile ?
        numeral(currentABSPercentile[metricItem.StatePercentileMetric]).value() : 0;
    const assetBandPercentile = currentABSPercentile ?
        numeral(currentABSPercentile[metricItem.AssetBandPercentileMetric]).value() : 0;
    return {
      MetricPercentile: metricValue,
      StatePercentile: statePercentile,
      AssetBandPercentile: assetBandPercentile,
      IsSymbolRequired: metricItem.IsSymbolRequired,
      Caption: metricItem.Caption,
      Format: metricItem.DataFormat,
      ExtraChar: metricItem.ExtraChar,
    };
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
    if (this.props.keyparams && this.props.selectedCU) {
      if (this.props.keyparams[0].cuNumber !== this.props.selectedCU.cuNumber) {
        this.props.renderReport(this.props.selectedCU);
      }
    }
    const FromQuarterList = this.props.toQuarter ? this.props.QuarterFilter
        .filter(item => item < this.props.toQuarter) : this.props.QuarterFilter;
    const ToQuarterList = this.props.fromQuarter ? this.props.QuarterFilter
        .filter(item => item > this.props.fromQuarter) : this.props.QuarterFilter;
    const fromQuarterDropDown = (
      <select className="quarter-select" name="quarterfilter" value={this.props.fromQuarter} onChange={e => this.onFromQtrChange(e)}>
        {FromQuarterList
              .map(option => (<option key={option} value={option}>{option}</option>))}
      </select>);
    const toQuarterDropDown = (
      <select className="quarter-select" name="quarterfilter" value={this.props.toQuarter} onChange={e => this.onToQtrChange(e)}>
        {ToQuarterList
              .map(option => (<option key={option} value={option}>{option}</option>))}
      </select>);

    const currentKeyParams = this.props.keyparams
        .find(item => item.Quarter === this.props.toQuarter);
    const currentABSPercentile = this.props.assetbandstatepercentile
        .find(item => item.Quarter === this.props.toQuarter);
    const filteredKeyParams = this.props.keyparams
        .filter(item => item.Quarter <= this.props.toQuarter &&
            item.Quarter >= this.props.fromQuarter);
    // this.props.renderReport(this.props.selectedCU);
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
                    <li className="active">
                      <Link to="#sc1" id="tabDa1" data-toggle="tab" aria-expanded="false">
                        Overall
                      </Link>
                    </li>
                    <li className="">
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
                          <div className="row">
                            <div className="col-sm-2" />
                            <div className="col-sm-5 MainSC">
                              <p className="lead text-left">
                                <span className="text-info text-left">
                                  Name of CU :
                                </span>
                                <span className="text-capitalize lead">
                                  {`  ${this.props.selectedCU.name}`}
                                </span>
                              </p>
                              <p className="lead text-left">
                                <span className="text-info text-left">
                                  State :
                                </span>
                                <span className="text-capitalize lead">
                                  {`  ${currentKeyParams ? currentKeyParams
                                      .stateName : ''}`}
                                </span>
                              </p>
                              <p className="lead text-left">
                                <span className="text-info text-left">
                                  City :
                                </span>
                                <span className="text-capitalize lead">
                                  {`  ${currentKeyParams ? currentKeyParams
                                      .City : ''}`}
                                </span>
                              </p>
                              <p className="lead text-left">
                                <span className="text-info text-left">
                                  #Members :
                                </span>
                                <span className="text-capitalize lead">
                                  {`  ${currentKeyParams ? numeral(currentKeyParams
                                    .TotalMembers).format('0,0') : 0}`}
                                </span>
                              </p>
                            </div>
                            <div className="col-sm-5">
                              <p className="lead text-left">
                                <span className="text-info">
                                  Assets :
                                </span>
                                <span className="lead text-capitalize" >
                                  {`  ${currentKeyParams ? numeral(currentKeyParams.TotalAssets).format('$ 0.0a') : 0}`}
                                </span>
                              </p>
                              <p className="lead text-left">
                                <span className="text-info">
                                  Asset Band :
                                </span>
                                <span className="lead text-capitalize" >
                                  {`  ${currentABSPercentile ? currentABSPercentile.Asset_Band : 0}`}
                                </span>
                              </p>
                              <p className="lead text-left">
                                <span className="text-info">
                                  Loans :
                                </span>
                                <span className="lead text-capitalize">
                                  {`  ${currentKeyParams ? numeral(currentKeyParams.TotalLoansLease).format('$ 0.0a') : 0}`}
                                </span>
                              </p>
                              <p className="lead text-left">
                                <span className="text-info text-left">
                                  #Branches :
                                </span>
                                <span className="text-info lead">
                                  {`  ${currentKeyParams ? currentKeyParams
                                      .Branches : 0}`}
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
                              <ChartTable
                                renderTableRow={Main.renderTableRow}
                                keyParams={filteredKeyParams}
                                metrics={this.props.metrics}
                                prepareData={Main.prepareData}
                                fromQuarterDropDown={fromQuarterDropDown}
                                toQuarterDropDown={toQuarterDropDown}
                              />
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
    QuarterFilter: state.cu.QuarterFilter,
    scorecardmetrics: state.cu.scorecardmetrics,
    assets: state.cu.assets,
    liabilities: state.cu.liabilities,
    keyparams: state.cu.keyparams,
    camels: state.cu.camels,
    assetbandstatepercentile: state.cu.assetbandstatepercentile,
    pearls: state.cu.pearls,
    incomeexpenses: state.cu.incomeexpenses,
    metrics: state.cu.metrics,
    firstQtr: state.cu.firstQtr,
    secondQtr: state.cu.secondQtr,
    firstQtrList: state.cu.firstQtrList,
    secondQtrList: state.cu.secondQtrList,
    fromQuarter: state.cu.fromQuarter,
    toQuarter: state.cu.toQuarter,
  };
}

const mapDispatchToProps = dispatch => ({
  changeFromQtr: value => dispatch({
    type: 'FROMQUARTER',
    payload: value,
  }),
  changeToQtr: value => dispatch({
    type: 'TOQUARTER',
    payload: value,
  }),
  selectedItem: chosenRequest => dispatch({
    type: SELECTED_CU,
    payload: chosenRequest,
  }),
  selectFirstQtr: value => dispatch({
    type: FIRSTQTR,
    payload: value,
  }),
  selectSecondQtr: value => dispatch({
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

