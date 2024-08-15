import React, { useState, useEffect } from "react";
import Card from "components/Card/Card";
import Chart from "react-apexcharts";


function BarChart({ data, value_set_one, chart_options }) { // Destructure data directly from props
  const [chartOptions, setChartOptions] = useState({});
  const [barChartData, setBarChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); 
  }, [value_set_one]); 

  return (
    <Card
      py="1rem"
      height={{ sm: "400px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      {isLoading ? ( 
        <div>Loading...</div>
      ) : (
        <Chart
          options={chart_options}
          series={value_set_one}
          type="bar"
          width="100%"
          height="100%"
        />
      )}
    </Card>
  );
}

export default BarChart;
