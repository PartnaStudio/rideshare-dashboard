// Chakra imports
import { Box, Flex, Grid, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React, { useEffect, useState } from "react";
import { barChartData, barChartOptions, summaruBarChartOptions, summaruPieChartOptions } from "../../../../variables/charts";
import BarChart from "../../../../components/Charts/BarChart";
import BarChartOld from "components/Charts/BarChartOld";
import turoData from '../../../../data/elevated_miami_data.json';
import PieChart from "components/Charts/PieChart";

const DataOverview = ({ title, percentage, activeButton }) => {
  const textColor = useColorModeValue("gray.700", "white");
  
  const [dailyAmount, setDailyAmount] = useState(0);
  const [simpleBarChartData, setSimpleBarChartData] = useState([]);
  const [simpleModelBarChartData, setModelSimpleBarChartData] = useState([]);
  const [simpleTypeBarChartData, setTypeSimpleBarChartData] = useState([]);
  const [simpleYearBarChartData, setYearSimpleBarChartData] = useState([]);

  const [labelName, setLabelName] = useState([]);
  const [ yearLabelName, setYearLabelName] = useState([]);
  const [ modelLabelName, setModelLabelName] = useState([]);
  const [ typeLabelName, setTypeLabelName] = useState([]);

  useEffect(() => {
    if (turoData && turoData.turo_data && turoData.turo_data.rankings) {
      let currentMakeRanking;
      let currentModelRanking;
      let currentTypeRanking;
      let currentYearRanking;
      let turoBase;
      // Dynamically access the ranking property based on activeButton
      currentMakeRanking = turoData.turo_data.rankings[`pop_make`];
      currentModelRanking = turoData.turo_data.rankings[`pop_model`];
      currentTypeRanking = turoData.turo_data.rankings[`pop_type`];
      currentYearRanking = turoData.turo_data.rankings[`pop_year`];
      turoBase = turoData.turo_data.rental_data;
      if (!turoBase) {
        console.error("Invalid activeButton or missing ranking data:", activeButton);
        return;
      }

      const avgDailyAmountArr = 
      turoData && 
      turoData.turo_data && 
      turoData.turo_data.rental_data && 
      Array.isArray(turoBase.avgDailyAmount) 
        ? turoBase.avgDailyAmount 
        : []; 

    const averageDailyAmount = 
      avgDailyAmountArr.length > 0 
        ? avgDailyAmountArr.reduce((sum, value) => sum + parseFloat(value), 0) / avgDailyAmountArr.length
        : 0; 

        const avgAvg = (dailyAmount?.length > 0) 
        ? dailyAmount.reduce((sum, value) => sum + parseFloat(value), 0) / dailyAmount.length 
        : 30;
      setDailyAmount(avgAvg)
      setSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([currentMakeRanking?.avgDailyRate
            ] || []),
        },
      ]);
      setModelSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([currentModelRanking?.avgDailyRate
            [0]] || []),
        },
      ]);
      setTypeSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([currentTypeRanking?.avgDailyRate
            [0]] || []),
        },
      ]);
      setYearSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([currentYearRanking?.avgDailyRate
            [0]] || []),
        },
      ]);

      const values = Object.values(currentMakeRanking?.make || {}); // Provide an empty object as default
      const Yearvalues = Object.values(currentYearRanking?.year || {});
      const Typevalues = Object.values(currentTypeRanking?.type || {});
      const Modelvalues = Object.values(currentModelRanking?.model || {});
      if (values.length > 0) {
          setLabelName([values[0]]);
          setYearLabelName([Yearvalues[0]]);
          setTypeLabelName([Typevalues[0]]);
          setModelLabelName([Modelvalues[0]]);
      } else {
          // Handle the case where there are no values
          console.error("No values found in currentRanking[activeButton]");
          setLabelName([]); // Or another suitable default
      }
    }
  }, [activeButton, turoData]);

  const showPieChart = useBreakpointValue({ base: false, lg: true });

  
  return (
    <Card p='10px' mb={{ sm: "26px", lg: "0px" }}>
      <Box w='100%' h={{ sm: "220px", md: '300px', lg: "220px" }} ps='8px'>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        templateRows={{ sm: "repeat(3, 1fr)", lg: "1fr" }}
        gap='24px'
        my='0px'
        mb={{ lg: "26px" }}>
        <PieChart 
            value_set_one={simpleBarChartData || []}
          labels = {[labelName[0], `Pie Chart 1`]}
          chart_options={summaruPieChartOptions(
            labelName, 
            dailyAmount, 
            `Average ${(activeButton.charAt(0).toUpperCase() + activeButton.slice(1))}`
          )}
          />
        <PieChart 
          value_set_one={simpleModelBarChartData}
          chart_options={summaruPieChartOptions(
              modelLabelName, 
              dailyAmount, 
              `Average ${(activeButton.charAt(0).toUpperCase() + activeButton.slice(1))}`
            )}
          labels = {[labelName[0], `Pie Chart 2`]}
          />
        {showPieChart && ( // Conditionally render the PieChart
        <PieChart
          value_set_one={simpleTypeBarChartData}
          chart_options={summaruPieChartOptions(
            typeLabelName, 
            dailyAmount, 
            `Average ${(activeButton.charAt(0).toUpperCase() + activeButton.slice(1))}`
          )}
          labels={[labelName[0], `Pie Chart 3`]}
        />
      )}
          
          
      </Grid>
      
      </Box>
    </Card>
  );
};

export default DataOverview;
