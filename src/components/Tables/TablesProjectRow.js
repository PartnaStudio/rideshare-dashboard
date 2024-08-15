import React, { useMemo } from "react";
import {
  Tr,
  Td,
  Flex,
  Text,
  Progress,
  Icon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaEllipsisV } from "react-icons/fa";

function DashboardTableRow(props) {
  const { 
    availability,
    completedTrips,
    estimatedQuote,
    hostId,
    id,
    isAllStarHost,
    isFavoritedBySearcher,
    isNewListing,
    make,
    model,
    rating,
    seoCategory,
    type,
    year,
    avgDailyAmount,
    cityLocation,
    unlimitedMiles
  } = props;

  const textColor = useColorModeValue("gray.700", "white");

  // Calculate progression based on completedTrips (you'll likely need to adjust this logic)
  const totalPossibleTrips = 100; // Or fetch this value from your data
  const progression = useMemo(() => (completedTrips / totalPossibleTrips) * 100, [completedTrips]); 
  const tableData = {
    cityLocation: cityLocation || '-',
    type: seoCategory || '-',
    year: year || '-',
    make: make || '-',
    model: model || '-',
    avgDailyAmount: avgDailyAmount || '-',
    completedTrips: completedTrips || '-',
    rating: rating || '-',
    isAllStarHost: isAllStarHost ? "Yes" : "No",
    isNewListing: isNewListing ? "Yes" : "No",
    unlimitedMiles: unlimitedMiles ? "Yes" : "No",
};

  return (
    <Tr>
      {Object.entries(tableData).map(([key, item]) => (
        <Td key={key} style={{color: 'black'}}>
          {item}
        </Td>
      ))}




      {/* Actions */}
      <Td>
        <Button p="0px" bg="transparent">
          <Icon as={FaEllipsisV} color="gray.400" cursor="pointer" />
        </Button>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
