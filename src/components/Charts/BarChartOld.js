import React, { Component, useEffect, useState } from "react";
import Card from "components/Card/Card";
import Chart from "react-apexcharts";
import { Box, Flex, Text } from "@chakra-ui/react";




function BarChartOld({ value_set_one, chart_options, labels }) { // Destructure data directly from props
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); 
  }, [value_set_one]); 

  return (
    <Card
      py="1rem"
      height={{ sm: "150px" }}
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
        options={chart_options}
        series={value_set_one}
        type="bar"
        width="100%"
        height="100%"
      />
    </Card>
  );
}

export default BarChartOld;
