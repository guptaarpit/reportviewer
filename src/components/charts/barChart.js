/* eslint-disable react/prop-types */
/**
 * Created by arpit on 7/19/2017.
 */
import { Bar } from 'react-chartjs-2';
import React from 'react';

const BarChart = (props) => {
  const { data, options } = props;
  return (
    <div>
      <Bar data={data} width={200} height={100} options={options} />
    </div>
  );
};

export default BarChart;
