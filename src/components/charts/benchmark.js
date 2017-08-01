/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/5/2017.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import numeral from 'numeral';
import { fetchCUList, retrieveOtherCuBenchMark, retrieveStateBenchMark, retrieveAssetBandBenchMark } from '../../actions/dashboard';
import { SELECTED_CU, FIRSTQTR, OTHERCU, LIST, SECONDQTR, SELECTEDSTATE, SELECTEDASSETBAND, CUFILTERSTATE } from '../../actions/types';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class BenchMark extends Component {
  static renderTableRow(metrics, benchmarks, otherCUData, stateData, assetBandData) {
    return metrics.map((item) => {
      if (item.Metric && benchmarks) {
        const propertyCheck = Object.prototype.hasOwnProperty.call(benchmarks, item.Metric);
        if (propertyCheck) {
          const currentCUValue = numeral(benchmarks[item.Metric]).format(item.DataFormat);
          const otherCUValue = otherCUData ? numeral(otherCUData[item.Metric])
              .format(item.DataFormat) : 0;
          const stateValue = stateData ? numeral(stateData[item.Metric])
              .format(item.DataFormat) : 0;
          const assetBandValue = assetBandData ? numeral(assetBandData[item.Metric])
              .format(item.DataFormat) : 0;
          return (
            <tr className="w3-border-cyan row">
              <td className="col-sm-2 text-left w3-border-indigo">
                {item.Caption}
              </td>
              <td className="col-sm-2 w3-border-indigo">
                {`${item.ExtraChar}${currentCUValue}`}
              </td>
              <td className="col-sm-2 w3-border-indigo">
                {`${item.ExtraChar}${otherCUValue}`}
              </td>
              <td className="col-sm-2 w3-border-indigo">
                {`${item.ExtraChar}${stateValue}`}
              </td>
              <td className="col-sm-2 w3-border-indigo">
                {`${item.ExtraChar}${assetBandValue}`}
              </td>
              <td className="col-sm-2 w3-border-indigo" />
            </tr>
          );
        }

        return '';
      }

      return (
        <tr className="row w3-border-cyan">
          <td
            colSpan={6}
            className="col-sm-12 text-center bold"
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

  static renderReactSlider(maxAssetBand) {
    if (maxAssetBand > 0) {
      return (
        <Range min={0} max={maxAssetBand} defaultValue={[1000, maxAssetBand]} tipFormatter={value => `${value}%`} />
      );
    }

    return '';
  }

  onStateChange(e) {
    this.props.selectState(e.target.value);
    if (this.props.stateBMData.length < 1) {
      this.props.renderStateBenchMarks();
    }
  }

  onAssetBandChange(e) {
    this.props.selectAssetBand(e.target.value);
    if (this.props.assetBandBMData.length < 1) {
      this.props.renderAssetBandBenchMarks();
    }
  }

  onCUChange(e) {
    this.props.selectOtherCU(e.target.value);
    this.props.renderOtherCUBenchMarks(e.target.value);
  }

  onChangeQtr(e) {
    this.props.selectFirstQtr(e.target.value);
  }

  changeCUFilter(e) {
    this.props.selectCUFilterState(e.target.value);
  }

  renderFilterBox(maxAssetBand) {
    console.log(maxAssetBand);
    return (
      <div className="row">
        <div className="col-sm-7 MainSC">
          <div className="lead text-left">
            <label className="control-label" htmlFor="quarterfilter">
                Quarter Filter :
            </label>
            <select className="form-control" name="quarterfilter" value={this.props.selectedQtr} onChange={e => this.onChangeQtr(e)}>
              {this.props.QuarterFilter
                  .map(option => (<option key={option} value={option}>{option}</option>))}
            </select>
          </div>
          <div className="lead text-left">
            <label className="control-label" htmlFor="cuStateFilter">
                Other CU Filter :
            </label>
            <select className="form-control" name="cuStateFilter" value={this.props.cuFilterState} onChange={e => this.changeCUFilter(e)}>
              {
                  this.props.StateFilter
                    .map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                }
            </select>
            <select className="form-control" name="cuFilter" value={this.props.OtherSelectedCU} onChange={e => this.onCUChange(e)}>
              {this.props.CUFilter
                    .map(option => (
                      <option key={option.cuNumber} value={option.cuNumber}>
                        {option.name}
                      </option>))}
            </select>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="lead text-left">
            <label className="control-label" htmlFor="stateFilter">
                State Filter :
              </label>
            <select className="form-control" name="stateFilter" value={this.props.selectedState} onChange={e => this.onStateChange(e)}>
              {this.props.StateFilter
                    .map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>))}
            </select>
          </div>
          <div className="lead text-left">
            <label className="control-label" htmlFor="assetbandFilter">
                Asset Band Filter:
              </label>
            {BenchMark.renderReactSlider(maxAssetBand)}
            <select
              className="form-control"
              name="assetbandFilter"
              value={this.props.selectedAssetBand}
              onChange={e => this.onAssetBandChange(e)}
            >
              {this.props.AssetBandFilter
                    .map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>))}
            </select>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const selectedBenchMark = this.props.benchmarks
        .find(item => item.Quarter === this.props.selectedQtr);
    const otherCUData = this.props.otherCUBenchMarkData ? this.props.otherCUBenchMarkData
        .find(item => item.Quarter === this.props.selectedQtr) : '';
    const stateData = this.props.stateBMData.length >= 1 ? this.props.stateBMData
        .find(item => item.Quarter === this.props.selectedQtr && item.STATE === this.props.selectedState) : '';
    const assetBandData = this.props.assetBandBMData.length >= 1 ? this.props.assetBandBMData
        .find(item => item.Quarter === this.props.selectedQtr && item.Asset_Band === this.props.selectedAssetBand) : '';
    const metrics = this.props.benchMarkMetrics;
    const otherCuName = this.props.culist
        .find(item => item.cuNumber === this.props.OtherSelectedCU);
    const maxAssetBand = this.props.maxAssetBand;

    return (
      <div>
        <div className="well-searchbox">
          {this.renderFilterBox(maxAssetBand)}
        </div>
        <table
          style={{ width: '100%', 'text-align': 'center' }}
          className="well nav nav-stacked table table-inverse text-center"
        >
          <thead>
            <tr className="w3-cyan text-center row">
              <th className="col-sm-2 text-center">
                {this.props.selectedQtr}
              </th>
              <th data-toggle="modal" data-target="#modal" className="col-sm-2 text-center PeriodN">
                {this.props.selectedCU.name}
              </th>
              <th data-toggle="modal" data-target="#modal" className="col-sm-2 text-center PeriodO">
                {otherCuName ? otherCuName.name : 'Other CU Name'}
              </th>
              <th className="col-sm-2 text-center">
                {this.props.selectedState}
              </th>
              <th className="col-sm-2 text-center">
                {this.props.selectedAssetBand}
              </th>
              <th className="col-sm-2 text-red text-center">{
                `State = ${this.props.selectedState} AssetBand = ${this.props.selectedAssetBand}`
              }</th>
            </tr>
          </thead>
          <tbody>
            {
              BenchMark
                  .renderTableRow(metrics, selectedBenchMark, otherCUData, stateData, assetBandData)
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
    cuFilterState: state.cu.cuFilterState,
    selectedAssetBand: state.cu.selectedAssetBand,
    selectedQtr: state.cu.selectedQtr,
    benchmarks: state.cu.benchmarks,
    benchMarkMetrics: state.cu.benchMarkMetrics,
    otherCUBenchMarkData: state.cu.otherCUBenchMarkData,
    stateBMData: state.cu.stateBMData,
    assetBandBMData: state.cu.assetBandBMData,
    culist: state.cu.culist,
    maxAssetBand: state.cu.maxAssetBand,
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
  selectOtherCU: value => dispatch({
    type: OTHERCU,
    payload: value,
  }),
  selectState: value => dispatch({
    type: SELECTEDSTATE,
    payload: value,
  }),
  selectCUFilterState: value => dispatch({
    type: CUFILTERSTATE,
    payload: value,
  }),
  selectAssetBand: value => dispatch({
    type: SELECTEDASSETBAND,
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
  renderOtherCUBenchMarks: (selectedCU) => {
    dispatch(retrieveOtherCuBenchMark(selectedCU));
  },
  renderStateBenchMarks: () => {
    dispatch(retrieveStateBenchMark());
  },
  renderAssetBandBenchMarks: () => {
    dispatch(retrieveAssetBandBenchMark());
  },
  fetchCUList: () => dispatch(fetchCUList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BenchMark);

