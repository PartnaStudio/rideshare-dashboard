import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { lineChartOptions } from "../../variables/charts";


function LineChart({ data, chart_options, line_data }) {
  const [chartOptions, setChartOptions] = useState({});
  const [lineChartData, setLineChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if data is available and has the expected structure
    if (data) {
      setLineChartData(line_data);
      setChartOptions(chart_options);
    } else {
      console.error("Invalid or missing data prop for LineChart component");
    }

    setIsLoading(false);
  }, [data]);

  return (
    isLoading ? (
      <div>Loading...</div>
    ) : (
      <ReactApexChart
        options={chart_options}
        series={line_data}
        type="area"
        width="100%"
        height="100%"
      />
    )
  );
}

export default LineChart;
