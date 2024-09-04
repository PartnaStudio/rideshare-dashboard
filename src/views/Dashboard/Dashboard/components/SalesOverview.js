// Chakra imports
import { Box, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React, { useEffect, useState } from "react";
import { barChartData, barChartOptions, summaruBarChartOptions, summaruPieChartOptions } from "../../../../variables/charts";
import BarChart from "../../../../components/Charts/BarChart";
import BarChartOld from "components/Charts/BarChartOld";
import turoData from '../../../../data/elevated_miami_data.json';
import PieChart from "components/Charts/PieChart";

const SalesOverview = ({ 
  title, percentage, 
  activeButton, makeData,
  yearData, modelData, typeData
 }) => {
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
      let turoBase;

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

        const avgAvg = (averageDailyAmount?.length > 0) 
        ? averageDailyAmount.reduce((sum, value) => sum + parseFloat(value), 0) / averageDailyAmount.length 
        : 30;
      setDailyAmount(avgAvg)
      setSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([makeData[0]?.avgDailyRate
            ] || []),
        },
      ]);
      setModelSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([modelData[0]?.avgDailyRate
            ] || []),
        },
      ]);
      setTypeSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([typeData[0]?.avgDailyRate
           ] || []),
        },
      ]);
      setYearSimpleBarChartData([
        {
          name: "Trip Count",
          data: Object.values([yearData[0]?.avgDailyRate
            ] || []),
        },
      ]);

      const values = makeData.map(item => ({
        make: item.make,
        avgDailyRate: item.avgDailyRate
      }));
      const Yearvalues = yearData.map(item => ({
        year: item.year,
        avgDailyRate: item.avgDailyRate
      }));
      const Typevalues = typeData.map(item => ({
        type: item.type,
        avgDailyRate: item.avgDailyRate
      }));
      const Modelvalues = modelData.map(item => ({
        model: item.model,
        avgDailyRate: item.avgDailyRate
      }));
      if (values.length > 0) {

          setLabelName([Object.values(values[0])]);
          setYearLabelName([Object.values(Yearvalues[0])]);
          setTypeLabelName([Object.values(Typevalues[0])]);
          setModelLabelName([Object.values(Modelvalues[0])]);
      } else {
          // Handle the case where there are no values
          console.error("No values found in currentRanking[activeButton]");
          setLabelName([]); // Or another suitable default
      }
    }
  }, [activeButton, turoData]);

  
  return (
    <Card p='10px' mb={{ sm: "26px", lg: "0px" }}>
      <Box w='100%' h={{ sm: "675px", md: "330px",lg: "330px" }} ps='8px'>
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)",md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }}
        templateRows={{ sm: "repeat(4, 1fr)", lg: "1fr" }}
        gap='24px'
        my='0px'
        mb={{ lg: "26px" }}>
        <BarChartOld 
            value_set_one={simpleBarChartData || []}
          labels = {[labelName[0], `Average`]}
          chart_options={summaruBarChartOptions(
            labelName, 
            dailyAmount, 
            `Average ${(activeButton.charAt(0).toUpperCase() + activeButton.slice(1))}`
          )}
          />
        <BarChartOld 
          value_set_one={simpleModelBarChartData}
          chart_options={summaruBarChartOptions(
              modelLabelName, 
              dailyAmount, 
              `Average ${(activeButton.charAt(0).toUpperCase() + activeButton.slice(1))}`
            )}
          labels = {[labelName[0], `Average`]}
          />
        <BarChartOld 
          value_set_one={simpleTypeBarChartData}
          chart_options={summaruBarChartOptions(
            typeLabelName, 
            dailyAmount, 
            `Average ${(activeButton.charAt(0).toUpperCase() + activeButton.slice(1))}`
          )}
        labels = {[labelName[0], `Average`]}
        />
        <BarChartOld 
          value_set_one={simpleYearBarChartData}
          chart_options={summaruBarChartOptions(
            yearLabelName, 
            dailyAmount, 
            `Average ${(activeButton.charAt(0).toUpperCase() + activeButton.slice(1))}`
          )}
        labels = {[labelName[0], `Average`]}
        />
          
          
      </Grid>
      
      </Box>
    </Card>
  );
};

export default SalesOverview;
