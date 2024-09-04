// Chakra imports
import {
  Button,
  Flex,
  Grid,
  MenuButton,
  Menu,
  Box,
  HStack,
  IconButton,
  Switch,
  MenuItem,
  MenuOptionGroup,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import BarChart from "../../../components/Charts/BarChart";
import React, { useCallback, useEffect, useState } from "react";
import MiniStatistics from "./components/MiniStatistics";
import SalesOverview from "./components/SalesOverview";
import DataOverview from "./components/DataOverview";
import turoData from '../../../data/elevated_miami_data.json';
import worldCities from '../../../data/worldcities.json';
import { MdPriceCheck } from "react-icons/md";
import { PiSteeringWheelFill } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { lineChartOptions, barChartOptions } from "../../../variables/charts";
import TopDash from "./components/MainDash";
import Tables from "../Tables";
import MapDataOverview from "./components/MapOverview";
import { LatLng } from "leaflet";
import { sendFilterRequest } from "hooks/data_analysis";
import { CSSTransition } from "react-transition-group";
import { MdChevronLeft, MdChevronRight, MdMenu } from "react-icons/md";
import "./styles.css";
export const CategoryDropdown = ({ CategoryList, activeCategory, handleCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  const renderedCategory = activeCategory === 'seoCategory' ? 'Car Type' : activeCategory.toString();

  const renderSubCategories = (subCategoryList) => (
    <MenuList>
      {subCategoryList.map((subCategory) => (
        <MenuItem key={subCategory} onClick={() => handleCategoryChange(subCategory)}>
          {subCategory}
        </MenuItem>
      ))}
    </MenuList>
  );

  return (
    <Menu isOpen={isOpen} onClose={handleClose}>
      <MenuButton as={Button} variant={isOpen ? 'solid' : 'ghost'} colorScheme="gray" leftIcon={<FaCar size="20px" color={'white'} />} justifyContent="flex-start" _hover={{ bg: "gray.100" }} onClick={handleOpen}>
        {renderedCategory}
      </MenuButton>
      <MenuOptionGroup title="Categories">
        {CategoryList.map((category) => {
          const subCategories = CategoryList.find((c) => c.main === category)?.sub;

          return (
            <MenuItemOption key={category} isDisabled={!subCategories} isSelected={activeCategory === category} onSelect={subCategories ? handleOpen : handleCategoryChange(category)}>
              {category.toString()}
              {subCategories && renderSubCategories(subCategories)}
            </MenuItemOption>
          );
        })}
      </MenuOptionGroup>
    </Menu>
  );
};

export function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 20);
  }

  return (
    <>
      <Menu className="dropdown" closeOnSelect={true}>
        <CSSTransition
          in={activeMenu === "main"}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <Flex className="main-menu" style={{width: '250px'}}>
            <MenuItem onClick={() => setActiveMenu("settings")}>
              Settings
              <Box pos="absolute" ml="80%">
                <MdChevronRight />
              </Box>
            </MenuItem>
            <MenuItem onClick={() => setActiveMenu("animals")}>
              Animals
              <Box pos="absolute" ml="80%">
                <MdChevronRight />
              </Box>
            </MenuItem>
            <MenuItem>
              Coding
              <Box pos="absolute" ml="80%">
                <MdChevronRight />
              </Box>
            </MenuItem>
          </Flex>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "settings"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <Flex className="menu-container">
            <HStack mb="8" spacing="60%">
              <Box>
                <IconButton
                  variant="outlined"
                  icon={<MdChevronLeft />}
                  onClick={() => setActiveMenu("main")}
                />
              </Box>
              <Switch />
            </HStack>
            <Box>
              <p>Generate your words here</p>
            </Box>
          </Flex>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === "animals"}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <Flex className="menu-container">
            <MenuItem onClick={() => setActiveMenu("main")}>Go back</MenuItem>
            <MenuItem>
              <p>Dog</p>
            </MenuItem>
            <MenuItem>
              <p>Cat</p>
            </MenuItem>
            <MenuItem>
              <p>Bird</p>
            </MenuItem>
          </Flex>
        </CSSTransition>
      </Menu>
    </>
  );
}


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
  const [selected, setSelected] = useState([]);
  const [locations,setLocations] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [position,setPosition] = useState([26.0380, -80.2101]);
  const [make, setMake] = useState([]);
  const [model, setModel] = useState([]);
  const [type, setType] = useState([]);
  const [year, setYear] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);
  const [selectedCategory,setSelectedCategory] = useState('');


  


  const handleMarkerClick = useCallback((id) => {
    setSelected(markers => markers.map(m => 
      m.id === markerId ? { ...m, selected: true } : m
    ));
  }, []);

  function findCities(cityNames, worldCities) {
    return cityNames.map(cityName => {
      return worldCities.find(city => city.city === cityName);
    });
  }


  function extractData(data) {
    const validData = data.filter(item => item?.lat && item?.lng);
    return validData.map((item,index) => ({
      id: index,
      selected: false,
      pos: item?.lat && item?.lng ? new LatLng(parseFloat(item?.lat), parseFloat(item?.lng)) : null,
      city: item?.city,
      lat: parseFloat(item?.lat) || 0,
      lng: parseFloat(item?.lng) || 0,
      population: item?.population,
    }));
  }

  function resetMap() {
    setSelected([]);
    setPosition([26.0380, -80.2101]);
  }
 

  const CategoryList = ['year','make','model','seoCategory','isAllStarHost','isNewListing','unlimitedMiles','cityLocation']

  const CategoryDictList = [
    {
      main: 'year',
      sub: ['one', 'two', 'three'],
    },
    {
      main: 'make',
      sub: ['one', 'two', 'three'],
    },
    {
      main: 'model',
      sub: ['one', 'two', 'three'],
    },
    {
      main: 'seoCategory',
      sub: ['one', 'two', 'three'],
    },
    {
      main: 'isAllStarHost',
      sub: ['one', 'two', 'three'],
    },
    {
      main: 'isNewListing',
      sub: ['one', 'two', 'three'],
    },
    {
      main: 'unlimitedMiles',
      sub: ['one', 'two', 'three'],
    },
    {
      main: 'cityLocation',
      sub: ['one', 'two', 'three'],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (turoData && turoData.turo_data && turoData.turo_data.rental_data) {

          const [makeData, modelData, typeData, yearData] = await Promise.all([
            sendFilterRequest(turoData.turo_data.rental_data, 'make'),
            sendFilterRequest(turoData.turo_data.rental_data, 'model'),
            sendFilterRequest(turoData.turo_data.rental_data, 'type'),
            sendFilterRequest(turoData.turo_data.rental_data, 'year'),
          ]);
      
          setMake(makeData);
          setModel(modelData);
          setType(typeData);
          setYear(yearData);
          console.log("MAKE: ",make)
          console.log("MODEL: ", model)
          console.log("TYPE: ", type)
          console.log("YEAR: ", year)


          let localCities;
          let cityLocations;
          const rentalData = turoData.turo_data.rental_data.cityLocation;
          const cities = [...new Set(Object.values(rentalData))];
          const currentRanking = await sendFilterRequest(turoData.turo_data.rental_data, activeButton);

          console.log(activeButton,"     ",currentRanking)
          localCities = findCities(cities,worldCities)
          cityLocations = extractData(localCities)
          setLocations(cityLocations)
          console.log("Rental Data: ",cityLocations)
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


        } else {
          console.error('Missing turoData or rental_data');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeButton, turoData]);

  const categoryChange = (newCategory) => {
    setSelectedCategory((prevCategory) => ({
      ...prevCategory,
      selectedCategory: newCategory,
    }));
  };

  
  
  return (
    <Flex flexDirection={'column'}>

    <Flex spacing='24px' py={5} alignItems={'center'} justifyContent={'space-between'}>
          <DropdownMenu />

<MiniStatistics
          title={"This Week's Popular Make"}
          amount={make && make.length > 0 ? make[0].make : 'Loading...'}
          percentage={make && make.length > 0 ? make[0].trip_count : 'Loading...'}
          icon={<FaCar style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
        <MiniStatistics
          title={"This Week's Popular Price"}
          amount={model && model.length > 0 ? model[0].model : 'Loading...'}
          percentage={model && model.length > 0 ? model[0].trip_count : 'Loading...'}
          icon={<MdPriceCheck style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
        
        <MiniStatistics
          title={"This Week's Popular Type"}
          amount={type && type.length > 0 ? type[0].type : 'Loading...'}
          percentage={type && type.length > 0  ? type[0].trip_count : 'Loading...'}
          icon={<PiSteeringWheelFill style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
       
        <MiniStatistics
          title={"This Week's Popular Year"}
          amount={year && year.length > 0 ? year[0].year : 'Loading...'}
          percentage={year && year.length > 0 ? year[0].trip_count : 'Loading...'}
          icon={<IoCalendarNumber style={{'height':24, 'width':'24'}} color={iconBoxInside} />}
        />
      </Flex>
    
    <Flex>
    <Flex h={{lg: "95vh"}}>
      
    <MapDataOverview 
        title={"Number of Trips Completed"}
        activeButton={activeButton}
        position={position}
        onMarkerClick={handleMarkerClick} 
        selected={setSelected}
        locations={locations}
        setLocations={setLocations}
      />
    </Flex>
    {isLoading ? <p>Loading...</p> :
    (<>
    <Flex flexDirection='column' pl={{ base: "120px", md: "75px" }} w={{base: "100%", lg: "50%"}} h={{base: "100%", lg: "95vh"}} overflowY={'scroll'}>
      
          <ul>
    {selected.map((item) => (
              <li key={item.id}>{item.city} {item.population}</li>
            ))}
          </ul>
          <Button onClick={() => resetMap([])}>reset</Button>
      
      

      {/* 

      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr" }}
        templateRows={{ sm: "repeat(1, 1fr)", lg: "1fr" }}
        gap='24px'
        my='0px'
        mb={{ lg: "26px" }}>
        <SalesOverview
          title={"Number of Trips Completed"}
          percentage={1}
          activeButton={activeButton || 'make'}
          makeData = {make}
          yearData = {year}
          modelData = {model}
          typeData = {type}
        />
        
        <DataOverview
        title={"Number of Trips Completed"}
        percentage={1}
        activeButton={activeButton || 'make'}
        />
      </Grid>


      <Grid
        templateColumns={{ sm: "1fr", lg: "1fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "repeat(2, 1fr)" }}
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
            value_set_one = {lineChartData}
            chart_options={sbarChartOptions}
            />}
            data={turoData}
            car_data_trips={carDataPrice}
            car_data_name={carDataName}
        />
      </Grid>
*/}
      <Tables fullKeys={CategoryList}/>
    </Flex>
    </>
    )}
    </Flex>
    
    </Flex>
  );
}
