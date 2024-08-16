// Chakra imports
import { Box, Flex, Grid, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import React, { useEffect, useState } from "react";
import { barChartData, barChartOptions, summaruBarChartOptions, summaruPieChartOptions } from "../../../../variables/charts";
import turoData from '../../../../data/elevated_miami_data.json';
import PieChart from "components/Charts/PieChart";

function filterTuroBaseByMake(turoBase, makeToFilter = 'Ford') {
  // 1. Find the maximum length among all arrays in turoBase
  const maxLength = Math.max(...Object.values(turoBase).map(arr => Array.isArray(arr) ? arr.length : 0));

  // 2. Fill in missing values with blanks (or another suitable default)
  for (const [key, values] of Object.entries(turoBase)) {
    if (Array.isArray(values)) {
      while (values.length < maxLength) {
        values.push(''); // Or 0, null, etc., depending on the data type
      }
    }
  }

  // 3. Apply the filtering logic with case-insensitive comparison and trimming
  const filteredTuroBase = {};

  for (const [key, values] of Object.entries(turoBase)) {
    if (Array.isArray(values)) {
      filteredTuroBase[key] = values.filter((value, index) => 
        turoBase.make[index]?.toLowerCase().trim() === makeToFilter.toLowerCase().trim()
      );
    } else {
      // Copy non-array values directly
      filteredTuroBase[key] = values; 
    }
  }

  return filteredTuroBase;
}


const DataOverview = ({ title, percentage, activeButton }) => {
  const textColor = useColorModeValue("gray.700", "white");
  
  const [dailyAmount, setDailyAmount] = useState(0);
  const [simplePieChartData, setSimplePieChartData] = useState([]);

  const [labelName, setLabelName] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (turoData && turoData.turo_data && turoData.turo_data.rankings) {
      let currentMakeRanking;
      let turoBase;
      let filtered;      // Dynamically access the ranking property based on activeButton
      currentMakeRanking = turoData.turo_data.rankings[`pop_make`];
      turoBase = turoData.turo_data.rental_data;
      filtered = filterTuroBaseByMake(turoBase)
      if (!turoBase) {
        console.error("Invalid activeButton or missing ranking data:", activeButton);
        return;
      };
      console.log("Filtered", filtered)

      const fordEntry = Object.entries(currentMakeRanking?.make)?.find(([key, value]) => value === "Ford");
      const fordTripCount = fordEntry ? currentMakeRanking?.trip_count[fordEntry[0]] : 0;
      const totalTripCounts = Object.values(currentMakeRanking?.trip_count).reduce((sum, count) => {
          if (typeof count === 'number') {
            return sum + count;
          } else {
            return sum; // Ignore non-numeric values
          }
        }, 0);


        setSimplePieChartData([
          {
            data: Object.values([fordTripCount, (totalTripCounts - fordTripCount)] || []),
          },
        ]);

      const values = Object.values(currentMakeRanking?.make || {}); // Provide an empty object as default
      if (values.length > 0) {
          setLabelName([values[0],'Other']);
      } else {
          // Handle the case where there are no values
          console.error("No values found in currentRanking[activeButton]");
          setLabelName([]); // Or another suitable default
      }
    }
    setIsLoading(false);
  }, [activeButton, turoData]);

  useEffect(() => {
    if (simplePieChartData && simplePieChartData.length > 0 && simplePieChartData[0].data) { 
      console.log("DATA", simplePieChartData[0].data)
    }
  }, [simplePieChartData]);

  const showPieChart = useBreakpointValue({ base: false, sm: false, md: true, lg: true });
  const showMdPieChart = useBreakpointValue({ base: false, sm: false, md: false, lg: true });

  
  return (
    <Card p='10px' mb={{ sm: "26px", lg: "0px" }}>
      {isLoading ? (
        <div>Loading...</div>
      ):(<Box w={{ sm: "100%", md: '100%', lg: "100%" }} h={{ sm: "220px", md: '300px', lg: "465px" }} ps='8px'>
      
      <Grid
        templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }}
        templateRows={{ sm: "repeat(3, 1fr)", lg: "1fr" }}
        gap='24px'
        my='0px'
        mb={{ lg: "26px" }}>
        <PieChart 
          value_set_one={simplePieChartData[0].data || []}
          chart_options={summaruPieChartOptions(
            labelName 
          )}
          labels = {[labelName[0], `Trips Completed`]}
          />
        {showPieChart && ( 
        <>
        <PieChart 
          value_set_one={simplePieChartData[0].data || []}
          chart_options={summaruPieChartOptions(
            labelName 
          )}
          labels = {[labelName[0], `Models Breakdown`]}
          />

         {showMdPieChart && ( 
          <>
          <PieChart
          value_set_one={simplePieChartData[0].data || []}
          chart_options={summaruPieChartOptions(
            labelName 
          )}
          labels={[labelName[0], `Price Breakdown`]}
        />
        <PieChart
          value_set_one={simplePieChartData[0].data || []}
          chart_options={summaruPieChartOptions(
            labelName 
          )}
          labels={[labelName[0], `Year Breakdown`]}
        />
        {/*<PieChart
          value_set_one={simplePieChartData[0].data || []}
          chart_options={summaruPieChartOptions(
            labelName 
          )}
          labels={[labelName[0], `Type Breakdown`]}
        />*/}
        </>
        )}
        </>
      )}
          
          
      </Grid>
      
      </Box>)}
    </Card>
  );
};

export default DataOverview;
