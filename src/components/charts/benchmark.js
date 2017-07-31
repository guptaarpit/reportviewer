/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/5/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { fetchCUList, renderDashboard } from '../../actions/dashboard';
import { SELECTED_CU, FIRSTQTR, SECONDQTR, LIST } from '../../actions/types';

class BenchMark extends Component {

  static renderTableRow(metrics, benchmarks) {
    return metrics.map((item) => {
      if (item.Metric && benchmarks) {
        const propertyCheck = Object.prototype.hasOwnProperty.call(benchmarks, item.Metric);
        if (propertyCheck) {
          const currentCUValue = numeral(benchmarks[item.Metric]).format(item.DataFormat);
          return (
            <tr className="w3-border-cyan">
              <td className="text-left w3-border-indigo">
                {item.Caption}
              </td>
              <td className="w3-border-indigo">
                {`${item.ExtraChar}${currentCUValue}`}
              </td>
              <td className="w3-border-indigo" />
              <td className="w3-border-indigo" />
              <td className="w3-border-indigo" />
              <td className="w3-border-indigo" />
            </tr>
          );
        }

        return '';
      }

      return (
        <tr className="w3-border-cyan">
          <td
            colSpan={6}
            className="text-center bold"
            style={{
              'background-color': 'rgba(25, 60, 100, 0.75)',
              color: '#fff',
              'font-size': '20px',
              'font-weight': 'bold',
            }}
          >
            {item.Caption}
          </td>
        </tr>
      );
    });
  }

  onChangeQtr(e) {
    console.log(e.target.value);
    this.props.selectFirstQtr(e.target.value);
  }

  render() {
    const selectedBenchMark = this.props.benchmarks
        .find(item => item.Quarter === this.props.selectedQtr);

    return (
      <div>
        <table
          style={{ width: '100%', 'text-align': 'center' }}
          className="well nav nav-stacked table table-inverse text-center"
        >
          <thead>
            <tr className="w3-cyan text-center">
              <th className=" text-center">
                <select value={this.props.selectedQtr} onChange={e => this.onChangeQtr(e)}>
                  {this.props.QuarterFilter
                      .map(option => (<option key={option} value={option}>{option}</option>))}
                </select>
              </th>
              <th data-toggle="modal" data-target="#modal" className="text-center PeriodN">
                {this.props.selectedCU.name}
              </th>
              <th data-toggle="modal" data-target="#modal" className="text-center PeriodO">
                <select value={this.props.OtherSelectedCU}>
                  {this.props.CUFilter
                      .map(option => (
                        <option key={option.cuNumber} value={option.name}>
                          {option.name}
                        </option>))}
                </select>
              </th>
              <th className="PeriodC text-center">
                <select value={this.props.selectedState}>
                  {this.props.StateFilter
                      .map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>))}
                </select>
              </th>
              <th className="text-center">
                <select value={this.props.selectedAssetBand}>
                  {this.props.AssetBandFilter
                      .map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>))}
                </select>
              </th>
              <th className="text-red text-center">{
                `State = ${this.props.selectedState} AssetBand = ${this.props.selectedAssetBand}`
              }</th>
            </tr>
          </thead>
          <tbody>
            {
              BenchMark.renderTableRow(this.props.benchMarkMetrics, selectedBenchMark)
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedCU: state.cu.selectedCU,
    StateFilter: state.cu.StateFilter,
    AssetBandFilter: state.cu.AssetBandFilter,
    QuarterFilter: state.cu.QuarterFilter,
    CUFilter: state.cu.CUFilter,
    OtherSelectedCU: state.cu.OtherSelectedCU,
    selectedState: state.cu.selectedState,
    selectedAssetBand: state.cu.selectedAssetBand,
    selectedQtr: state.cu.selectedQtr,
    benchmarks: state.cu.benchmarks,
    benchMarkMetrics: state.cu.benchMarkMetrics,
  };
}

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(BenchMark);

