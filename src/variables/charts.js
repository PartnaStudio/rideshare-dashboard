import turoData from '../data/elevated_miami_data.json';

export const barChartData = [
  {
    name: "Sales",
    data: [330],
  },
];

export const summaruPieChartOptions = (categories) => ({
  chart: {
    type: 'pie',
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
    display: true,
    position: 'bottom', 
  },
  tooltip: {
    enabled: false,
    colors: ['black'],
  },
  dataLabels: {
    enabled: true,

    style: {
      fontSize: '12px',
      colors: ['black'] // Set data label color to black
    },
    dropShadow: {
      enabled: false // Disable drop shadow for better centering
    }
  },
  labels: categories,
  stroke: { // Add stroke configuration
    show: true, // Hide the border around pie slices
    colors: '#64B5F6',
  },
  colors: [
    '#ffffff',
    '#f6f6f6',
    '#fafafa'
  ], 
});



export const summaruBarChartOptions = (categories, position, label) => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
    display: true,
    position: 'top', 
  },
  tooltip: {
    enabled: false, 
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 0,
      columnWidth: "30px",
    },
  },
  xaxis: {
    categories: categories,
    labels: {
      style: {
        colors: "#fff", // Darker text color for better contrast on the light gray background
        fontSize: "12px",
      },
      show: true
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: true,
    },
  },
  yaxis: {
    show: true,
    labels: {
      style: {
        colors: "#fff", // Darker text color for better contrast on the light gray background
        fontSize: "12px",
      },
      
      show: true
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  grid: {
    show: false,
  },
  fill: {
    colors: ["#fff", "#fff"], // Lighter shades of gray for the bars
  },
  annotations: { 
    xaxis: [
      {
        x: position, 
        borderColor: '#00E396', // Keep the original color for the annotation line
        strokeDashArray: 0, 
        borderWidth: 3, 
        label: {
          borderColor: '#00E396',
          style: {
            color: '#000',
            background: '#00E396',
          },
        }
      }
    ]
  },
});



export const barChartOptions = (categories) => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      backgroundColor: "red",
      fontSize: "12px",
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        backgroundColor: "red",
        fontSize: "12px",
        fontFamily: undefined,
      },
    },
    theme: "dark",
    y: {
      formatter: (value) => { 
        return value.toFixed(2); // Round to 2 decimal places
      },
    },
  },
  xaxis: {
    categories: categories,
    show: true,
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "12px",
      },
      
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: true,
    color: "#fff",
    labels: {
      show: true,
      style: {
        colors: "#fff",
        fontSize: "14px",
      },
      formatter: (value) => { 
        return value.toFixed(0); // Round y-axis labels to 2 decimal places
      },
    },
  },
  grid: {
    show: false,
  },
  fill: {
    colors: "#fff",
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 8,
      columnWidth: "12px",
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
          },
        },
      },
    },
  ],
});

export const lineChartData = [
  {
    name: "Mobile apps",
    data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
  },
  {
    name: "Websites",
    data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
  },
];

export const lineChartOptions = (categories) => ({
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    theme: "dark",
    y: {
      formatter: (value) => { 
        return value.toFixed(2); // Round to 2 decimal places
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "category",
    categories: categories,
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
    },
  },
  yaxis: [{
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
      formatter: (value) => { 
        return value.toFixed(2); // Round y-axis labels to 2 decimal places
      },
    },
  },
  {
    // Configuration for the second y-axis (right)
    opposite: true, // Place this axis on the right side
    labels: {
      style: {
        colors: "#c8cfca",
        fontSize: "12px",
      },
      formatter: (value) => { 
        return value.toFixed(2); // Round y-axis labels to 2 decimal places
      },
    },
    // ... other configurations for the second y-axis if needed
  },],
  legend: {
    show: false,
  },
  grid: {
    strokeDashArray: 5,
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "light",
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 0.8,
      opacityTo: 0,
      stops: [],
    },
    colors: ["#add8e6", "#2D3748"],
  },
  colors: ["#72bcd4", "#2D3748"],
});
