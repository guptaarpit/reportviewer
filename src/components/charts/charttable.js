/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/19/2017.
 */
import React from 'react';

const ChartTable = (props) => {
  const {
    keyParams,
    renderTableRow,
    metrics,
    prepareData,
    fromQuarterDropDown,
    toQuarterDropDown,
  } = props;
  return (
    <div>
      <table style={{ width: '100%', 'text-align': 'center' }} className="well nav nav-stacked table table-inverse text-center">
        <thead>
          <tr className="w3-cyan row text-center">
            <th className="text-center col-sm-2" rowSpan={2}>Metric</th>
            <th data-toggle="modal" data-target="#modal" className="text-center col-sm-2">
            From
          </th>
            <th data-toggle="modal" data-target="#modal" className="text-center col-sm-2">
            To
          </th>
            <th className="col-sm-2 text-center" rowSpan={2}>Change</th>
            <th className="text-center col-sm-4" rowSpan={2}>Trend</th>
          </tr>
          <tr className="w3-cyan row text-center">
            <th data-toggle="modal" data-target="#modal" className="text-center col-sm-2 from-quarter">
              {fromQuarterDropDown}
            </th>
            <th data-toggle="modal" data-target="#modal" className="text-center col-sm-2 to-quarter">
              {toQuarterDropDown}
            </th>
          </tr>
        </thead>
        <tbody id="ASSETS">
          {renderTableRow(metrics, keyParams, prepareData)}
        </tbody>
      </table>
    </div>
  );
};

export default ChartTable;
