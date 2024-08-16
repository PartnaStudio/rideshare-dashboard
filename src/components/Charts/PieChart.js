import React, { Component, useEffect, useState } from "react";
import Card from "components/Card/Card";
import Chart from "react-apexcharts";
import { Box, Flex, Text } from "@chakra-ui/react";




function PieChart({ value_set_one, chart_options, labels }) { // Destructure data directly from props
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Update chartOptions with custom tooltip when data is available
    if (value_set_one && labels) {
      setChartOptions({
        ...chart_options, // Merge with existing options
        tooltip: {
          enabled: false,
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            if (w.globals.tooltip && w.globals.tooltip.markup) {
              const currentDataPoint = series[seriesIndex][dataPointIndex];
              const categoryName = labels[dataPointIndex + 1]; // Assuming labels are 0-indexed
              const percentage = ((currentDataPoint / series[seriesIndex].reduce((a, b) => a + b, 0)) * 100).toFixed(2);

              return w.globals.tooltip.markup
                .replace(/fill="(.+?)"/g, 'fill="#000"')
                .replace(/color="(.+?)"/g, 'color="#fff"')
                .replace(/(<div .+?<\/div>)/, // Replace the entire default content
                        `<div style="background-color: #fill; color: #fff; padding: 5px; border-radius: 3px;">
                          <p><strong>${categoryName}</strong></p>
                          <p>Value: ${currentDataPoint}</p>
                          <p>Percentage: ${percentage}%</p>
                        </div>`);
            } else {
              return '<div style="background-color: #00E396; color: #000; padding: 5px; border-radius: 3px;">Tooltip content loading...</div>';
            }
          },
        },
      });
    }

    setIsLoading(false);
  }, [value_set_one, labels, chart_options]); 

  return (
    <Card
      py="1rem"
      height={{ sm: "220px", md: "300px", lg: "220px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <Flex direction="row" mt={0} padding={0} marginBottom={0}> {/* Adjust margin as needed */}
      
      <Flex key={0} align="center" mb={0}> 
        <Box 
          w=".2rem" 
          h="1rem" 
          borderRadius="0%" 
          bg={'#00E396'} 
          mr={2} 
        />
        <Text style={{fontSize: '12px', color: 'white'}}>{labels[1]}</Text>
      </Flex>
  </Flex>

      <Chart
        options={chartOptions}
        series={value_set_one}
        type="donut"
        width="100%"
        height="100%"
      />
    </Card>
  );
}

export default PieChart;
