/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/19/2017.
 */
import React from 'react';
import numeral from 'numeral';
import Knob from 'react-canvas-knob';

const Widgets = (props) => {
  const {
    widgetData,
  } = props;
  let profitLossIcon = '';
  if (widgetData.MetricPercentile > 0) {
    profitLossIcon = <i className="fa fa-chevron-up" style={{ color: 'green' }} />;
  } else if (widgetData.MetricPercentile < 0) {
    profitLossIcon = <i className="fa fa-chevron-down" style={{ color: 'red' }} />;
  }

  return (
    <div className="w3-col m6 l4 w3-card-8 w3-center keyParam">
      <div className="w3-container w3-padding-16">
        <h4 className="w3-card-8 w3-white">{widgetData.Caption}</h4>
        <div className="w3-row">
          <h3 className="metric">{numeral(widgetData.MetricPercentile).format(widgetData.Format)}{widgetData.ExtraChar} {profitLossIcon}</h3>
        </div>
        <div className="w3-clear" />
        <br />
        <p>State Percentile</p>
        <div style={{ display: 'inline', width: '90px', height: '90px' }} >
          <Knob
            value={widgetData.StatePercentile}
            thickness={0.10}
            readOnly
            bgColor="#EEA"
            max={1}
            step={0.01}
            width={100}
            height={100}
            displayInput={false}
            displayCustom={
                () => (<input type="text" readOnly value={`${numeral(widgetData.StatePercentile).format('0.00%')}`} style={{ width: '55px', height: '50px', position: 'absolute', 'vertical-align': 'middle', 'margin-top': '30px', 'margin-left': '-75px', border: '0px', background: 'none', 'font-style': 'normal', 'font-variant': 'normal', 'font-weight': '100', 'font-stretch': 'normal', 'font-size': '16px', 'line-height': 'normal', 'font-family': 'Arial', 'text-align': 'center', color: 'rgb(238, 170, 34)', padding: '0px', '-webkit-appearance': 'none' }} />)
              }
          />
        </div>
        <br />
        <p>Asset Band Percentile</p>
        <div style={{ display: 'inline', width: '90px', height: '90px' }} >
          <Knob
            value={widgetData.AssetBandPercentile}
            thickness={0.10}
            readOnly
            bgColor="#EEA"
            max={1}
            step={0.01}
            width={100}
            height={100}
            displayInput={false}
            displayCustom={
                () => (<input type="text" readOnly value={`${numeral(widgetData.AssetBandPercentile).format('0.00%')}`} style={{ width: '55px', height: '50px', position: 'absolute', 'vertical-align': 'middle', 'margin-top': '30px', 'margin-left': '-75px', border: '0px', background: 'none', 'font-style': 'normal', 'font-variant': 'normal', 'font-weight': '100', 'font-stretch': 'normal', 'font-size': '16px', 'line-height': 'normal', 'font-family': 'Arial', 'text-align': 'center', color: 'rgb(238, 170, 34)', padding: '0px', '-webkit-appearance': 'none' }} />)
              }
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
