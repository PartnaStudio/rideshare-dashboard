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

  for (let rowIndex = 0; ;rowIndex++) {
      const row = {};
      let hasDataInRow = false; // Flag to check if the row has any non-undefined values

      for (const [columnName, columnValues] of Object.entries(data)) {
          if (columnValues[rowIndex] !== undefined) {
              hasDataInRow = true;
              row[columnName] = columnValues[rowIndex];
              
          } else {
              // Replace undefined with '-' or 0 based on column type
              row[columnName] = (typeof columnValues[0] === 'number' ? 0 : '-'); 
            }
      }

      if (hasDataInRow) {
          rowData.push(row);
      } else {
          // If all values in the row are undefined, we've reached the end
          break;
      }
  }

  console.log("Original data:", data);

  return (
    <Card my='22px' overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
            {title}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead>
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
            {rowData.slice(0,10).map((row, index) => {
              return (
                <DashboardTableRow
                  key={`${row.id}-${index}`}
                  availability={row.availability}
                  completedTrips={row.completedTrips}
                  estimatedQuote={row.estimatedQuote} 
                  hostId={row.hostId}
                  id={row.id} 
                  isAllStarHost={row.isAllStarHost} 
                  isFavoritedBySearcher={row.isFavoritedBySearcher} 
                  isNewListing={row.isNewListing} 
                  make={row.make} 
                  model={row.model} 
                  rating={row.rating} 
                  seoCategory={row.seoCategory} 
                  type={row.type} 
                  year={row.year} 
                  avgDailyAmount={row.avgDailyAmount} 
                  cityLocation={row.cityLocation} 
                  unlimitedMiles={row.unlimitedMiles} 
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Projects;
