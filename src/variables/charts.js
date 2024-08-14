export const barChartData = [
  {
    name: "Sales",
    data: [330, 250, 110, 300, 490, 350, 270, 130, 425],
  },
];

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
