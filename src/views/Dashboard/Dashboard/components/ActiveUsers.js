// Chakra imports
import { Button, Flex, Hide, Show, SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// Custom icons
import {
  CartIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ChartStatistics from "./ChartStatistics";

const ActiveUsers = ({ title, percentage, chart, data, car_data_name, car_data_trips }) => {
  const iconBoxInside = useColorModeValue("white", "white");
  const textColor = useColorModeValue("gray.700", "white");

  const [currentSlide, setCurrentSlide] = useState(0); 

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Show 4 items at a time
    slidesToScroll: 4, // Scroll 4 items at a time
    initialSlide: 0,
    nextArrow: <IoIosArrowForward />,
    prevArrow: <IoIosArrowBack />,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [ // Add responsive settings for smaller screens
      {
        breakpoint: 768, // Adjust breakpoint as needed
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480, // Adjust breakpoint as needed
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  

  const totalTrips = car_data_trips?.reduce((sum, trips) => sum + trips, 0) || 0;

  const chartStatisticsData = car_data_trips.map((trips, index) => {
    const percentage = ((trips / totalTrips) * 100).toFixed(2); // Calculate percentage and round to 2 decimals
    const iconIndex = index % 4; // Cycle through the four icons
    const icons = [<WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />, 
                   <RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />, 
                   <CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />, 
                   <StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />];

    return {
      title: car_data_name[index],
      amount: trips.toString(),
      percentage: parseFloat(percentage), // Convert percentage string to number
      icon: icons[iconIndex],
    };
  });

  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };


  return (
    <Card p='16px'>
      <CardBody>
        <Flex direction='column' w='100%'>
          {chart}
          <Flex direction='column' mt='24px' mb='36px' alignSelf='flex-start'>
            <Text fontSize='lg' color={textColor} fontWeight='bold' mb='6px'>
              {title}
            </Text>
            {/*<Text fontSize='md' fontWeight='medium' color='gray.400'>
              <Text
                as='span'
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight='bold'>
                {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
              </Text>{" "}
              than last week
            </Text>*/}
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            {chartStatisticsData.slice(0, showAll ? chartStatisticsData.length : 4).map((item, index) => (
              <ChartStatistics
                key={index} 
                title={item.title}
                amount={item.amount}
                percentage={item.percentage}
              />
            ))}
          </SimpleGrid>
          <Show below="md">
            {!showAll && chartStatisticsData.length > 4 && (
              <Button onClick={handleShowAll} mt={4} size="sm" colorScheme="blue">
                Show All
              </Button>
            )}
          </Show>

          <Hide below="md">
            {showAll && (
              <Button onClick={handleShowLess} mt={4} size="sm" colorScheme="blue">
                Show Less
              </Button>
            )}
          </Hide>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default ActiveUsers;
