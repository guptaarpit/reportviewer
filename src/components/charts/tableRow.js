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
  const firstMetric = numeral(itemData[itemData.length - 1][metrics.Metric]).value();
  const secondMetric = numeral(itemData[0][metrics.Metric]).value();
  let profitLossIcon = <i className="fa fa-caret-square-o-right" />;
  if (metrics.Format !== '0.00%') {
    if (firstMetric > secondMetric) {
      profitLossIcon = <i className="fa fa-chevron-up" style={{ color: 'green' }} />;
    } else if (firstMetric < secondMetric) {
      profitLossIcon = <i className="fa fa-chevron-down" style={{ color: 'red' }} />;
    }
  }

  const profitLossValue = numeral(((firstMetric - secondMetric) * 100) / firstMetric).format('0.00');

  return (
    <tr className="row w3-border-indigo">
      <td className="text-left text-capitalize col-sm-2 w3-border-indigo">{metrics.Caption}</td>
      <td className="text-center col-sm-2 w3-border-indigo">{numeral(secondMetric).format(metrics.Format)}</td>
      <td className="text-center col-sm-2 w3-border-indigo">{numeral(firstMetric).format(metrics.Format)}</td>
      <td className="text-center col-sm-2 w3-border-indigo">{metrics.Format !== '0.00%' ? `${profitLossValue}%` : numeral(firstMetric).format(metrics.Format)} {profitLossIcon}</td>
      <td className="col-sm-4 w3-border-indigo">
        <BarChart data={barData.data} options={barData.options} />
      </td>
    </tr>
  );
};

export default TableRows;
