// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  useBoolean,
  useColorModeValue,
} from "@chakra-ui/react";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import React, { useCallback, useEffect, useState } from "react";
import ActiveUsers from "./components/ActiveUsers";
import MiniStatistics from "./components/MiniStatistics";
import SalesOverview from "./components/SalesOverview";
import DataOverview from "./components/DataOverview";
import turoData from '../../../data/elevated_miami_data.json';
import { MdPriceCheck } from "react-icons/md";
import { PiSteeringWheelFill } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { lineChartOptions, barChartOptions, summaruBarChartOptions } from "../../../variables/charts";
import TopDash from "./components/MainDash";
import Tables from "../Tables";
import MapDataOverview from "./components/MapOverview";


export default function Dashboard() {
  const iconBoxInside = useColorModeValue("white", "white");
  const [activeButton, setActiveButton] = useState('make'); // Single state for active button, default to 'make'

  const handleButtonClick = useCallback((buttonType) => {
    setActiveButton(buttonType);
  }, []);

  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [sbarChartOptions, setBarChartOptions] = useState({});
  const [slineChartOptions, setLineChartOptions] = useState({});
  const [carDataName, setCarDataName] = useState([]);
  const [carDataTrips, setCarDataTrips] = useState([]);
  const [carDataPrice, setCarDataPrice] = useState([]);



  const CategoryList = ['year','make','model','seoCategory','isAllStarHost','isNewListing','unlimitedMiles','cityLocation']

  useEffect(() => {
    if (turoData && turoData.turo_data && turoData.turo_data.rankings) {
      let currentRanking;

      // Dynamically access the ranking property based on activeButton
      currentRanking = turoData.turo_data.rankings[`pop_${activeButton}`];

      if (!currentRanking) {
        console.error("Invalid activeButton or missing ranking data:", activeButton);
        return;
      }




      setBarChartData([
        {
          name: "Trip Count",
          data: Object.values(currentRanking?.trip_count || []),
        },
      ]);
      setLineChartData([
        {
          name: "Daily Price",
          data: Object.values(currentRanking?.avgDailyRate || []),
        },
      ]);
      setBarChartOptions(barChartOptions(Object.values(currentRanking?.[activeButton] || [])));
      setLineChartOptions(lineChartOptions(Object.values(currentRanking?.[activeButton] || [])));
      setCarDataName(Object.values(currentRanking?.[activeButton] || []));
      setCarDataTrips(Object.values(currentRanking?.trip_count || []));
      setCarDataPrice(
        Object.values(currentRanking?.avgDailyRate || [])
          .map(value => parseFloat(value).toFixed(2))
      );
    }
  }, [activeButton, turoData]);


  
  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 2, md: 4, xl: 8 }} spacing='24px' py={5}>
      {CategoryList.map((category) => (
          <Button
            key={category}
            variant={activeButton === category ? "solid" : "ghost"}
            colorScheme="gray"
            leftIcon={<FaCar size="20px" color={iconBoxInside} />} // Function to get icon based on category
            justifyContent="flex-start"
            _hover={{ bg: "gray.100" }}
            onClick={() => handleButtonClick(category)}
          >
            {category === 'seoCategory' ? 'Car Type' : category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </SimpleGrid>

      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px' mb={5}>
      <MiniStatistics
          title={"This Week's Popular Make"}
          amount={turoData ? turoData.turo_data.rankings.pop_make.make[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_make.trip_count[0] : 'Loading...'}
          icon={<FaCar style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"This Week's Popular Price"}
          amount={turoData ? turoData.turo_data.rankings.pop_model.model[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_model.trip_count[0] : 'Loading...'}
          icon={<MdPriceCheck style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
        
        <MiniStatistics
          title={"This Week's Popular Type"}
          amount={turoData ? turoData.turo_data.rankings.pop_type.type[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_type.trip_count[0] : 'Loading...'}
          icon={<PiSteeringWheelFill style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
       
        <MiniStatistics
          title={"This Week's Popular Year"}
          amount={turoData ? turoData.turo_data.rankings.pop_year.year[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_year.trip_count[0] : 'Loading...'}
          icon={<IoCalendarNumber style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
      </SimpleGrid>

      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr" }}
        templateRows={{ sm: "repeat(1, 1fr)", lg: "1fr" }}
        gap='24px'
        my='0px'
        mb={{ lg: "26px" }}>
        <SalesOverview
          title={"Number of Trips Completed"}
          percentage={1}
          activeButton={activeButton}
        />
        <MapDataOverview 
          title={"Number of Trips Completed"}
          percentage={1}
          activeButton={activeButton}
        />
        <DataOverview
        title={"Number of Trips Completed"}
        percentage={1}
        activeButton={activeButton}
        />
      </Grid>

      

      <Grid
        templateColumns={{ sm: "1fr", lg: "1.5fr 1.5fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        my='26px'
        mb={{ lg: "26px" }}>
        <TopDash
          title={"Number of Trips Completed"}
          percentage={1}
          chart={<BarChart 
            data={turoData}
            value_set_one = {barChartData}
            chart_options = {sbarChartOptions} 
          />}
          data={turoData}
          car_data_trips={carDataTrips}
          car_data_name={carDataName}

        />
        <TopDash
          title={"Daily Rental Price"}
          percentage={1}
          chart={<BarChart 
            data={turoData} 
            chart_options={sbarChartOptions}
            value_set_one = {lineChartData}
            />}
            data={turoData}
            car_data_trips={carDataPrice}
            car_data_name={carDataName}
        />
      </Grid>
      
      <Tables fullKeys={CategoryList}/>
    </Flex>
  );
}
