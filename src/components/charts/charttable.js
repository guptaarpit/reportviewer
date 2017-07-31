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
  } = props;

  return (
    <div>
      <table style={{ width: '100%', 'text-align': 'center' }} className="well nav nav-stacked table table-inverse text-center">
        <thead>
          <tr className="w3-cyan text-center">
            <th className=" text-center">Metric</th>
            <th data-toggle="modal" data-target="#modal" className="text-center PeriodN">
              {keyParams[0] ? keyParams[0].Quarter : 'Latest Quarter'}
            </th>
            <th data-toggle="modal" data-target="#modal" className="text-center PeriodO">
              {keyParams[0] ? keyParams[keyParams.length - 1].Quarter : 'Starting Quarter'}
            </th>
            <th className="PeriodC text-center">Change</th>
            <th className="text-center">Trend</th>
            <th className="text-red text-center">Delete</th>
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
