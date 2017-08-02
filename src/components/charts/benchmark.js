/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/5/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';
import numeral from 'numeral';
import { AutoComplete } from 'material-ui';
import { fetchCUList, retrieveOtherCuBenchMark, retrieveStateBenchMark, retrieveAssetBandBenchMark, retrieveAssetBandStateBenchMark } from '../../actions/dashboard';
import { SELECTED_CU, FIRSTQTR, OTHERCU, LIST, SECONDQTR, SELECTEDSTATE, SELECTEDASSETBAND, CUFILTERSTATE } from '../../actions/types';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


class BenchMark extends Component {

  static filterAutoComplete(searchText, key) {
    if (searchText.length >= 2) {
      return AutoComplete.caseInsensitiveFilter(searchText, key);
    }

    return searchText.length === 0;
  }

  static generateAssetBand(max) {
    const assetBandArray = [];
    let j = 1000;
    for (let i = 0; i <= max; i += j) {
      if (i === 10000
          || i === 100000
          || i === 1000000
          || i === 10000000
          || i === 100000000
          || i === 1000000000
          || i === 10000000000
          || i === 100000000000) {
        j = i;
      }
      assetBandArray.push(i);
    }

    return assetBandArray;
  }

  static renderTableRow(metrics,
    benchmarks,
    otherCUData,
    stateData, assetBandData, stateAssetBandData) {
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
          const stateAssetBandValue = stateAssetBandData ? numeral(stateAssetBandData[item.Metric])
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
              <td className="col-sm-2 w3-border-indigo">
                {`${item.ExtraChar}${stateAssetBandValue}`}
              </td>
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

  onStateChange(e) {
    this.props.selectState(e.target.value);
    this.retrieveStateAssetBandBM();
    if (this.props.stateBMData.length < 1) {
      this.props.renderStateBenchMarks();
    }
  }

  onAssetBandChange(e) {
    console.log(e);
    this.props.selectAssetBand(e);
    this.retrieveStateAssetBandBM();
    if (this.props.assetBandBMData.length < 1) {
      this.props.renderAssetBandBenchMarks();
    }
  }

  onMinAssetBandChange(e) {
    console.log(e);
    const maxAssetBand = numeral(this.props.selectedAssetBand[1] + this.props.maxAssetBandRange)
        .value();
    const minAssetBand = numeral(e + this.props.minAssetBandRange)
        .value();
    if (maxAssetBand > minAssetBand) {
      this.props.selectAssetBand([e, this.props.selectedAssetBand[1]]);
      this.retrieveStateAssetBandBM();
    } else {
      this.props
          .selectAssetBand([this.props.selectedAssetBand[1] - e, this.props.selectedAssetBand[1]]);
      this.retrieveStateAssetBandBM();
    }
  }

  onMaxAssetBandChange(e) {
    console.log(e);
    const maxAssetBand = numeral(e + this.props.maxAssetBandRange)
        .value();
    const minAssetBand = numeral(this.props.selectedAssetBand[0] + this.props.minAssetBandRange)
        .value();
    if (minAssetBand < maxAssetBand) {
      this.props.selectAssetBand([this.props.selectedAssetBand[0], e]);
      this.retrieveStateAssetBandBM();
    } else {
      this.props.selectAssetBand([this.props.selectedAssetBand[0] - e, e]);
      this.retrieveStateAssetBandBM();
    }
  }

  onMinRangeChange(e) {
    this.props.minRangeChange(e.target.value);
    const maxAssetBand = numeral(this.props.selectedAssetBand[1] + this.props.maxAssetBandRange)
        .value();
    const minAssetBand = numeral(this.props.selectedAssetBand[0] + this.props.minAssetBandRange)
        .value();
    if (maxAssetBand > minAssetBand) {
      this.retrieveStateAssetBandBM();
    } else {
      this.props
          .selectAssetBand([1, this.props.selectedAssetBand[1]]);
      this.retrieveStateAssetBandBM();
    }
  }

  onMaxRangeChange(e) {
    this.props.maxRangeChange(e.target.value);
    const maxAssetBand = numeral(this.props.selectedAssetBand[1] + this.props.maxAssetBandRange)
        .value();
    const minAssetBand = numeral(this.props.selectedAssetBand[0] + this.props.minAssetBandRange)
        .value();
    if (minAssetBand < maxAssetBand) {
      this.retrieveStateAssetBandBM();
    } else {
      this.props.selectAssetBand([1, this.props.selectedAssetBand[1]]);
      this.retrieveStateAssetBandBM();
    }
  }
  onCUChange(e) {
    this.props.selectOtherCU(e.cuNumber);
    this.props.renderOtherCUBenchMarks(e.cuNumber);
  }

  onChangeQtr(e) {
    this.props.selectFirstQtr(e.target.value);
  }

  changeCUFilter(e) {
    this.props.selectCUFilterState(e);
  }

  retrieveStateAssetBandBM() {
    if (this.props.selectedState && this.props.selectedAssetBand) {
      console.log(numeral(this.props.selectedAssetBand[0] + this.props.minAssetBandRange).value());
      setTimeout(() => {
        this.props
            .renderStateAssetBandBenchMarks(this.props.selectedState,
                numeral(this.props.selectedAssetBand[0] + this.props.minAssetBandRange).value(),
                numeral(this.props.selectedAssetBand[1] + this.props.maxAssetBandRange).value());
      }, 1000);
    }
  }

  renderReactSlider(maxAssetBand) {
    if (maxAssetBand > 0) {
      return (
        <Range min={0} max={maxAssetBand} value={this.props.selectedAssetBand} tipFormatter={value => numeral(value).format('$0a')} allowCross={false} step={1000000} onAfterChange={e => this.onAssetBandChange(e)} />
      );
    }

    return '';
  }


  renderFilterBox(maxAssetBand, otherCuName) {
    const assetBandArray = BenchMark.generateAssetBand(maxAssetBand);
    return (
      <div className="row">
        <div className="col-sm-7 MainSC">
          <div className="lead text-left">
            <label className="control-label" htmlFor="quarterfilter">
                Quarter :
              </label>
            <select className="quarter-select" name="quarterfilter" defaultValue={[0, maxAssetBand]} onChange={e => this.onChangeQtr(e)}>
              {this.props.QuarterFilter
                    .map(option => (<option key={option} value={option}>{option}</option>))}
            </select>
          </div>
          <div className="lead text-left">
            <label className="control-label" htmlFor="cuStateFilter">
                Compare Other CU :
              </label>
            <div className="row">
              <div className="range-text-right col-sm-2">
                <AutoComplete
                  name="cuMain"
                  dataSource={this.props.StateFilter}
                  onNewRequest={e => this.changeCUFilter(e)}
                  floatingLabelText="State Peer"
                  fullWidth
                  searchText={this.props.cuFilterState}
                  openOnFocus
                />
              </div>
              <div className="range-text-right col-sm-8">
                <AutoComplete
                  name="cuMain"
                  dataSource={this.props.CUFilter}
                  onNewRequest={e => this.onCUChange(e)}
                  dataSourceConfig={{ text: 'name', value: 'cuNumber' }}
                  floatingLabelText="Credit Unions"
                  filter={BenchMark.filterAutoComplete}
                  fullWidth
                  searchText={otherCuName ? otherCuName.name : 'Other CU Name'}
                  openOnFocus
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="lead text-left">
            <label className="control-label" htmlFor="stateFilter">
                State :
              </label>
            <select className="state-select" name="stateFilter" value={this.props.selectedState} onChange={e => this.onStateChange(e)}>
              {this.props.StateFilter
                    .map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>))}
            </select>
          </div>
          <div className="lead text-left">
            <div>
              <label className="control-label" htmlFor="assetbandFilter">
                Asset Band:
              </label>
            </div>
            <div className="row">
              <div className="col-sm-1">
                $
              </div>
              <div className="range-text-left col-sm-4">
                <AutoComplete
                  name="cuMain"
                  dataSource={assetBandArray}
                  onNewRequest={e => this.onMinAssetBandChange(parseFloat(e))}
                  floatingLabelText="Min"
                  fullWidth
                  searchText={this.props.selectedAssetBand[0]}
                />
              </div>
              <div className="col-sm-1">
                <select className="currency-select" onChange={e => this.onMinRangeChange(e)} value={this.props.minAssetBandRange}><option value={'m'}>M</option><option value={'b'}>B</option></select>
              </div>
              <div className="col-sm-1">
                $
              </div>
              <div className="range-text-right col-sm-4">
                <AutoComplete
                  name="cuMain"
                  dataSource={assetBandArray}
                  onNewRequest={e => this.onMaxAssetBandChange(parseFloat(e))}
                  floatingLabelText="Max"
                  fullWidth
                  searchText={this.props.selectedAssetBand[1]}
                />
              </div>
              <div className="col-sm-1">
                <select className="currency-select" onChange={e => this.onMaxRangeChange(e)} value={this.props.maxAssetBandRange}><option value={'m'}>M</option><option value={'b'}>B</option></select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const maxAssetBandValue = numeral(this.props.selectedAssetBand[1]
        + this.props.maxAssetBandRange)
        .value();
    const minAssetBandValue = numeral(this.props.selectedAssetBand[0]
        + this.props.minAssetBandRange)
        .value();
    const selectedBenchMark = this.props.benchmarks
        .find(item => item.Quarter === this.props.selectedQtr);
    const otherCUData = this.props.otherCUBenchMarkData ? this.props.otherCUBenchMarkData
        .find(item => item.Quarter === this.props.selectedQtr) : '';
    const stateData = this.props.stateBMData.length >= 1 ? this.props.stateBMData
        .find(item => item.Quarter === this.props.selectedQtr && item.STATE === this.props.selectedState) : '';
    const assetBandData = this.props.assetBandBMData.length >= 1 ? this.props.assetBandBMData
        .find(item => item.Quarter === this.props.selectedQtr &&
            (item.MinAssets >= minAssetBandValue && item.MaxAssets <= maxAssetBandValue)) : '';
    const stateAssetBandData = this.props
        .stateAssetBandBMData.length >= 1 ? this.props.stateAssetBandBMData
        .find(item => item.Quarter === this.props.selectedQtr) : '';
    const metrics = this.props.benchMarkMetrics;
    const otherCuName = this.props.culist
        .find(item => item.cuNumber === this.props.OtherSelectedCU);
    const maxAssetBand = this.props.maxAssetBand;

    console.log(assetBandData);

    return (
      <div>
        <div className="well-searchbox">
          {this.renderFilterBox(maxAssetBand, otherCuName)}
        </div>
        <table
          style={{ width: '100%', 'text-align': 'center' }}
          className="well nav nav-stacked table table-inverse text-center"
        >
          <thead><tr className="w3-cyan text-center row">
            <th className="col-sm-2 text-center">
              Quarter
            </th>
            <th data-toggle="modal" data-target="#modal" className="col-sm-2 text-center PeriodN">
              Your Credit Union
            </th>
            <th data-toggle="modal" data-target="#modal" className="col-sm-2 text-center PeriodO">
              Other Credit Union
            </th>
            <th className="col-sm-2 text-center">
              State Peer
            </th>
            <th className="col-sm-2 text-center">
              Asset Band Peer
            </th>
            <th className="col-sm-2 text-red text-center" rowSpan={2}>
              <div>{`StatePeers = ${this.props.selectedState}`}</div>
              <div>{`AssetBand = ${numeral(this.props.selectedAssetBand[0] + this.props.minAssetBandRange).format('$0a')} - ${numeral(this.props.selectedAssetBand[1] + this.props.maxAssetBandRange).format('$0a')}`}</div>
            </th>
          </tr>
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
                {`${numeral(this.props.selectedAssetBand[0] + this.props.minAssetBandRange).format('$0a')} - ${numeral(this.props.selectedAssetBand[1] + this.props.maxAssetBandRange).format('$0a')}`}
              </th>
            </tr>
          </thead>
          <tbody>
            {
              BenchMark
                  .renderTableRow(metrics,
                      selectedBenchMark,
                      otherCUData,
                      stateData,
                      assetBandData,
                      stateAssetBandData)
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
    stateAssetBandBMData: state.cu.stateAssetBandBMData,
    minAssetBandRange: state.cu.minAssetBandRange,
    maxAssetBandRange: state.cu.maxAssetBandRange,
  };
}

const mapDispatchToProps = dispatch => ({
  minRangeChange: e => dispatch({
    type: 'MINRANGE',
    payload: e,
  }),
  maxRangeChange: e => dispatch({
    type: 'MAXRANGE',
    payload: e,
  }),
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
  renderStateAssetBandBenchMarks: (selectedState, minAssetBand, maxAssetBand) => {
    dispatch(retrieveAssetBandStateBenchMark(selectedState, minAssetBand, maxAssetBand));
  },
  fetchCUList: () => dispatch(fetchCUList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BenchMark);

