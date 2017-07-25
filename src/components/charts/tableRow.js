/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/19/2017.
 */
import React from 'react';
import numeral from 'numeral';
import BarChart from './barChart';

const TableRows = (props) => {
  const { barData,
    itemData,
    metrics,
  } = props;
  const firstMetric = numeral(itemData[0][metrics.Metric]).value();
  const secondMetric = numeral(itemData[itemData.length - 1][metrics.Metric]).value();
  let profitLossIcon = '';
  if (firstMetric > secondMetric) {
    profitLossIcon = <i className="fa fa-chevron-up" style={{ color: 'green' }} />;
  } else if (firstMetric < secondMetric) {
    profitLossIcon = <i className="fa fa-chevron-down" style={{ color: 'red' }} />;
  }

  const profitLossValue = numeral(((firstMetric - secondMetric) * 100) / firstMetric).format('0.00');

  return (
    <tr>
      <td>{metrics.Caption}</td>
      <td>{firstMetric}</td>
      <td>{secondMetric}</td>
      <td>{profitLossValue}% {profitLossIcon}</td>
      <td>
        <BarChart data={barData.data} options={barData.options} />
      </td>
    </tr>
  );
};

export default TableRows;
