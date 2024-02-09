// import React, { useEffect, useState } from "react";
// import ApexChart from "react-apexcharts";
// import { useDispatch, useSelector } from "react-redux";
// import { selectWeather } from "../redux/selectors";
// import { StyledChartWrapper } from "./Chart.styled";
// import { getWeatherThunk } from "../redux/thunksAPI";

// const Chart = () => {
//   const [chartData, setChartData] = useState([]);
//   const dispatch = useDispatch();

//   const weather = useSelector(selectWeather);
//   const weatherData = weather.list;
//   console.log("weatherLIST:", weatherData);

//   useEffect(() => {
//     dispatch(getWeatherThunk(""));
//   }, [dispatch]);

//   useEffect(() => {
//     if (weatherData?.length > 0) {
//       const temperatureData = weatherData.slice(0, 8).map((item) => ({
//         x: new Date(item.dt * 1000).toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//         }),
//         y: item.main.temp,
//       }));

//       setChartData(temperatureData);
//     }
//   }, [weatherData]);

//   const processTemperatureData = (data) => {
//     return data.map((dataPoint) => ({
//       x: dataPoint.x,
//       y: dataPoint.y < 0 ? -dataPoint.y : dataPoint.y,
//     }));
//   };

//   const options = {
//     stroke: {
//       width: 0,
//       curve: "smooth",
//     },
//     foreignObject: {
//       height: "70px",
//     },
//     chart: {
//       id: "weather-chart",
//       toolbar: {
//         show: false,
//       },
//       height: 80,
//       // height: "62px",
//       background: "transparent",
//     },
//     dataLabels: {
//       enabled: true,
//       background: "transparent",

//       style: {
//         colors: ["#C5C5C5"],
//         fontSize: "6px",
//         fontFamily: "Jost",
//       },
//       offsetY: -4,
//     },
//     yaxis: {
//       labels: {
//         show: false,
//       },
//       axisBorder: {
//         width: 0.1,
//         color: "red",
//       },
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.8,
//         opacityTo: 0.9,
//       },
//     },
//     xaxis: {
//       categories: chartData.map((dataPoint) => dataPoint.x),
//       axisBorder: {
//         show: false,
//       },
//       labels: {
//         offsetY: -6,
//         style: {
//           colors: "#C5C5C5",
//           fontSize: "6px",
//           fontFamily: "Jost",
//         },
//       },
//     },
//     grid: {
//       show: false,
//     },
//     tickAmount: 0,
//   };

//   const series = [
//     {
//       name: "Temperature",
//       data: processTemperatureData(chartData).map((dataPoint) => dataPoint.y),
//       color: "#5B8CFF",
//     },
//   ];

//   return (
//     <StyledChartWrapper>
//       <ApexChart options={options} series={series} type="area" height={70} />
//     </StyledChartWrapper>
//   );
// };

// export default Chart;

import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, selectWeather } from "../redux/selectors";
import { StyledChartWrapper } from "./Chart.styled";
import { getWeatherThunk } from "../redux/thunksAPI";

const Chart = ({ data, temperature }) => {
  const [chartData, setChartData] = useState([]);
  const dispatch = useDispatch();

  const weather = useSelector(selectWeather);
  const weatherData = weather.list;
  console.log("weatherLIST:", weatherData);

  console.log("DATA:", data);

  const temperatureO = weather;
  console.log("TEMP:", temperature);

  const favorites = useSelector(selectFavorites);
  console.log("FAV:", favorites);

  useEffect(() => {
    dispatch(getWeatherThunk(""));
  }, [dispatch]);

  useEffect(() => {
    if (data?.length > 0) {
      const temperatureData = data.slice(0, 8).map((item) => ({
        x: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        y: item.main.temp,
      }));

      setChartData(temperatureData);
    }
  }, [data]);

  const processTemperatureData = (data) => {
    return data.map((dataPoint) => ({
      x: dataPoint.x,
      y: dataPoint.y < 0 ? -dataPoint.y : dataPoint.y,
    }));
  };

  const options = {
    stroke: {
      width: 0,
      curve: "smooth",
    },
    foreignObject: {
      height: "70px",
    },
    chart: {
      id: "weather-chart",
      toolbar: {
        show: false,
      },
      height: 80,
      // height: "62px",
      background: "transparent",
    },
    dataLabels: {
      enabled: true,
      background: "transparent",

      style: {
        colors: ["#C5C5C5"],
        fontSize: "6px",
        fontFamily: "Jost",
      },
      offsetY: -4,
    },
    yaxis: {
      tickAmount: 20,
      labels: {
        show: false,
      },
      axisBorder: {
        width: 0.1,
        color: "red",
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.9,
      },
    },
    xaxis: {
      categories: chartData.map((dataPoint) => dataPoint.x),
      axisBorder: {
        show: false,
      },
      labels: {
        offsetY: -6,
        style: {
          colors: "#C5C5C5",
          fontSize: "6px",
          fontFamily: "Jost",
        },
      },
    },
    grid: {
      show: false,
    },
    tickAmount: 0,
  };

  const series = [
    {
      name: "Temperature",
      data: processTemperatureData(chartData).map((dataPoint) => dataPoint.y),
      color: chartData.some((dataPoint) => dataPoint.y < 0)
        ? "#5B8CFF"
        : "#FFA25B",
      stroke: {
        curve: "smooth",
      },
    },
  ];

  return (
    <StyledChartWrapper>
      <ApexChart
        options={options}
        series={series}
        type="area"
        width={343}
        height={90}
      />
    </StyledChartWrapper>
  );
};

export default Chart;
