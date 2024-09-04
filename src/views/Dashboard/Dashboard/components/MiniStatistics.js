// Chakra imports
import {
  Flex,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/Card/Card.js";
import CardBody from "../../../../components/Card/CardBody.js";
import IconBox from "../../../../components/Icons/IconBox";
import React from "react";

const MiniStatistics = ({ title, amount, percentage, icon }) => {
  const iconTeal = useColorModeValue("linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)", "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)");
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card minH='30px' w='175.0px'>
      <CardBody>
        <Flex flexDirection='row' align='center' justify='center' w='100%'>
          <Stat>
            <StatLabel
              fontSize='xs'
              color='gray.400'
              fontWeight='bold'
              pb='.1rem'>
              {title}
            </StatLabel>
            <Flex>
              <StatNumber fontSize='md' color={textColor}>
                {amount}
              </StatNumber>
              <StatHelpText
                alignSelf='flex-end'
                justifySelf='flex-end'
                m='0px'
                color={percentage > 0 ? "blue.400" : "red.400"}
                fontWeight='bold'
                ps='3px'
                fontSize='sm'>
                {percentage > 0 ? `${percentage} trips` : `${percentage} trips`}
              </StatHelpText>
            </Flex>
          </Stat>
          <IconBox as='div' h={"30px"} w={"30px"} bg={iconTeal}>
            {icon}
          </IconBox>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
