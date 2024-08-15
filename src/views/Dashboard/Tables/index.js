// Chakra imports
import { Flex } from "@chakra-ui/react";
import React from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "../../../variables/general";
import turoData from '../../../data/elevated_miami_data.json';

function Tables() {
  console.log("Rental Car Data",Object.keys(turoData.turo_data.rental_data))
  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {/*<Authors
        title={"Filtered Data View"}
        captions={["Author", "Function", "Status", "Employed", ""]}
        data={tablesTableData}
      />*/}
      <Projects
        title={"All Data View"}
        captions={Object.keys(turoData.turo_data.rental_data)}
        data={turoData.turo_data.rental_data}
      />
    </Flex>
  );
}

export default Tables;
