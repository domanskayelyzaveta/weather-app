import React, { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { StyledChartWrapper } from "./Chart.styled";

const Chart = ({ data, unit }) => {
  const [chartData, setChartData] = useState([]);

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
  }, [data, unit]);

  const processTemperatureData = (data) => {
    return data.map((dataPoint) => ({
      x: dataPoint.x,
      y: Math.round(dataPoint.y < 0 ? -dataPoint.y : dataPoint.y),
    }));
  };

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "2-digit" };
    const formattedDate = new Date(date).toLocaleDateString("en-US", options);
    const [month, day] = formattedDate.split("/");
    return `${day}.${month}`;
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
      categories: chartData.map((dataPoint) => formatDate(dataPoint.x)),
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
      /// data: processTemperatureData(chartData).map((dataPoint) => dataPoint.y),
      data: processTemperatureData(chartData).map((dataPoint) =>
        unit === "celsius"
          ? dataPoint.y
          : Math.round((dataPoint.y * 9) / 5 + 32)
      ),
      //     color: chartData.some((dataPoint) => dataPoint.y < 0)
      //       ? "#5B8CFF"
      //       : "#FFA25B",
      //     stroke: {
      //       curve: "smooth",
      //     },
      //   },
      // ];
      color:
        unit === "celsius" && chartData.some((dataPoint) => dataPoint.y < 0)
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
