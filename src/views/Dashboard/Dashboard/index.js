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
// assets
import peopleImage from "assets/img/people-image.png";
import logoChakra from "assets/svg/logo-white.svg";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useCallback, useEffect, useState } from "react";
import ActiveUsers from "./components/ActiveUsers";
import BuiltByDevelopers from "./components/BuiltByDevelopers";
import MiniStatistics from "./components/MiniStatistics";
import OrdersOverview from "./components/OrdersOverview";
import SalesOverview from "./components/SalesOverview";
import WorkWithTheRockets from "./components/WorkWithTheRockets";
import turoData from '../../../data/base_miami_data.json';
import { MdPriceCheck } from "react-icons/md";
import { PiSteeringWheelFill } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import Authors from "../Tables/components/Authors";
import Projects from "../Tables/components/Projects";
import { tablesTableData, dashboardTableData } from "../../../variables/general";
import Tables from "../Tables";
import { lineChartOptions, barChartOptions } from "../../../variables/charts";


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

  useEffect(() => {
    if (turoData && turoData.turo_data && turoData.turo_data.rankings) {
      let currentRanking;

      switch (activeButton) {
        case 'type':
          currentRanking = turoData.turo_data.rankings.pop_type;
          break;
        case 'make':
          currentRanking = turoData.turo_data.rankings.pop_make;
          break;
        case 'year':
          currentRanking = turoData.turo_data.rankings.pop_year;
          break;
        default:
          console.error("Invalid activeButton:", activeButton);
          return; // Or handle the error in another way
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
        {
          name: "Trip Count",
          data: Object.values(currentRanking?.trip_count || []),
        },
      ]);
      setBarChartOptions(barChartOptions(Object.values(currentRanking?.[activeButton] || [])));
      setLineChartOptions(lineChartOptions(Object.values(currentRanking?.[activeButton] || [])));
      setCarDataName(Object.values(currentRanking?.[activeButton] || []));
      setCarDataTrips(Object.values(currentRanking?.trip_count || []));
    }
  }, [activeButton, turoData]);
  
  return (
    <Flex flexDirection='column' pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
        <MiniStatistics
          title={"This Week's Popular Price"}
          amount={turoData ? turoData.turo_data.rankings.pop_price.avgDailyAmount[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_price.trip_count[0] : 'Loading...'}
          icon={<MdPriceCheck style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"This Week's Popular Type"}
          amount={turoData ? turoData.turo_data.rankings.pop_type.type[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_type.trip_count[0] : 'Loading...'}
          icon={<PiSteeringWheelFill style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"This Week's Popular Model"}
          amount={turoData ? turoData.turo_data.rankings.pop_make.make[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_make.trip_count[0] : 'Loading...'}
          icon={<FaCar style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"This Week's Popular Year"}
          amount={turoData ? turoData.turo_data.rankings.pop_year.year[0] : 'Loading...'}
          percentage={turoData ? turoData.turo_data.rankings.pop_year.trip_count[0] : 'Loading...'}
          icon={<IoCalendarNumber style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ sm: 1, md: 3, xl: 3 }} spacing='24px' py={5}>
      

      <Button
          variant={activeButton === 'type' ? "solid" : "ghost"}
          colorScheme="gray"
          leftIcon={<PiSteeringWheelFill size="20px" color={iconBoxInside} />}
          justifyContent="flex-start"
          _hover={{ bg: "gray.100" }}
          onClick={() => handleButtonClick('type')}
        >
          Type
        </Button>

        <Button
          variant={activeButton === 'make' ? "solid" : "ghost"}
          colorScheme="gray"
          leftIcon={<MdPriceCheck size="20px" color={iconBoxInside} />}
          justifyContent="flex-start"
          _hover={{ bg: "gray.100" }}
          onClick={() => handleButtonClick('make')}
        >
          Make
        </Button>

        <Button
          variant={activeButton === 'year' ? "solid" : "ghost"}
          colorScheme="gray"
          leftIcon={<FaCar size="20px" color={iconBoxInside} />}
          justifyContent="flex-start"
          _hover={{ bg: "gray.100" }}
          onClick={() => handleButtonClick('year')}
        >
          Year
        </Button>
      </SimpleGrid>
      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap='24px'
        my='26px'
        mb={{ lg: "26px" }}>
        <ActiveUsers
          title={"Number of Completed Trips by Make"}
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
        <SalesOverview
          title={"Number of Trips Completed vs. Daily Rental Price"}
          percentage={1}
          chart={<LineChart 
            data={turoData} 
            chart_options={slineChartOptions}
            line_data = {lineChartData}
            />}
        />
      </Grid>

    </Flex>
  );
}
