// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/Card/Card.js";
import CardBody from "../../../../components/Card/CardBody.js";
import CardHeader from "../../../../components/Card/CardHeader.js";
import DashboardTableRow from "../../../../components/Tables/TablesProjectRow";
import React from "react";

const Projects = ({ title, captions, data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  const rowData = [];

  function transposeToRow(data, rowIndex) {
    const row = {};
    let hasDataInRow = false;
  
    for (const [columnName, columnValues] of Object.entries(data)) {
      if (columnValues[rowIndex] !== undefined) {
        hasDataInRow = true; // Set to true only if a non-undefined value is found
        row[columnName] = columnValues[rowIndex];
      } else {
        row[columnName] = (typeof columnValues[0] === 'number' ? 0 : '-'); 
      }
    }
  
    return hasDataInRow ? row : null; 
  }

  const maxLength = Math.max(...Object.values(data).map(arr => arr.length)); // Find the longest column



  return (
    <Card my='22px' overflowX={{ sm: "scroll", xl: "scroll" }} maxHeight="900px" overflowY={{ sm: "scroll", xl: "scroll" }}>
      <CardHeader p='6px 0px 22px 0px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
            {title}
          </Text>
        </Flex>
      </CardHeader>
          
          <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead position="sticky" top={0} bg={useColorModeValue("gray.50", "gray.800")} zIndex={1}>
            <Tr my='.8rem' pl='0px'>
              {captions.map((caption, idx) => {
                return (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
          {
  
            Array.from({ length: Math.min(100, 500) }) // Create an array for iteration
              .map((_, index) => {
                const row = transposeToRow(data, index);
                return row ? (
                  <DashboardTableRow
                      {...row}
                      key={`${index}`}
                      availability={row?.availability}
                      completedTrips={row?.completedTrips}
                      estimatedQuote={row?.estimatedQuote} 
                      hostId={row?.hostId}
                      id={row?.id} 
                      isAllStarHost={row?.isAllStarHost} 
                      isFavoritedBySearcher={row?.isFavoritedBySearcher} 
                      isNewListing={row?.isNewListing} 
                      make={row?.make} 
                      model={row?.model} 
                      rating={row?.rating} 
                      seoCategory={row?.seoCategory} 
                      type={row?.type} 
                      year={row?.year} 
                      avgDailyAmount={row?.avgDailyAmount} 
                      cityLocation={row?.cityLocation} 
                      unlimitedMiles={row?.unlimitedMiles} 
                    />
                ) : null;
              })
          }
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Projects;

