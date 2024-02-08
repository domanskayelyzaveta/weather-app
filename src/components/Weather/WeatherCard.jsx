// import React from "react";
import { useSelector } from "react-redux";
import { selectWeather } from "../redux/selectors";
import {
  DateParagraph,
  Img,
  ParagraphSun,
  StyledChartDiv,
  StyledDegreeBtn,
  StyledImgSunDiv,
  StyledTemperature,
  StyledTitleWrapper,
  StyledWeatherInfoDiv,
  TitleH2,
  WeatherCardWrapper,
} from "./WeatherCard.styled";
import moment from "moment";
import Chart from "../Chart/Chart";
import { useState } from "react";

const WeatherCard = ({ weatherData }) => {
  console.log("CARD:", weatherData);
  const weather = useSelector(selectWeather);

  const [unit, setUnit] = useState("celsius");

  const cityName = weather?.city?.name;
  const country = weather?.city?.country;
  const icon = weatherData?.weather[0].icon;
  const weatherStatus = weatherData?.weather[0]?.main;

  const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

  if (
    !weatherData ||
    !weatherData.main ||
    !weatherData.weather ||
    !weatherData.wind
  ) {
    return;
  }

  const sunnyWeatherStatus =
    weatherStatus === "Clear" ? "Sunny" : weatherStatus;

  const formatDate = (dateString) => {
    const date = moment(dateString);
    const formattedDate = date.format("ddd, D MMMM, HH:mm");

    return formattedDate;
  };

  const originalDate = weatherData?.dt_txt;
  const formattedDate = formatDate(originalDate);

  const convertTemperature = (value) => {
    if (unit === "celsius") {
      return value;
    } else {
      return Math.round((value * 9) / 5 + 32);
    }
  };

  return (
    <WeatherCardWrapper>
      <StyledTitleWrapper>
        <TitleH2>
          {cityName}, {country}
        </TitleH2>
        <StyledImgSunDiv>
          <Img src={iconUrl} alt="sun" />
          <ParagraphSun>{sunnyWeatherStatus}</ParagraphSun>
        </StyledImgSunDiv>
      </StyledTitleWrapper>

      <DateParagraph>{formattedDate}</DateParagraph>

      <StyledChartDiv>
        <Chart />
      </StyledChartDiv>

      <StyledWeatherInfoDiv>
        <div>
          <StyledTemperature>
            {Math.round(convertTemperature(weatherData.main.temp))}
          </StyledTemperature>
          <p>
            Feels like:
            {Math.round(convertTemperature(weatherData.main.feels_like))}
            {unit === "celsius" ? "C°" : "F°"}
          </p>
        </div>

        <div>
          <StyledDegreeBtn
            onClick={() => setUnit("celsius")}
            $active={unit === "celsius"}
          >
            °C
          </StyledDegreeBtn>
          <StyledDegreeBtn
            onClick={() => setUnit("fahrenheit")}
            $active={unit === "fahrenheit"}
          >
            °F
          </StyledDegreeBtn>
        </div>

        <div>
          <p>
            Wind: {weatherData.wind.speed} <span>m/s</span>
          </p>
          <p>
            Humidity: {weatherData.main.humidity}
            <span>%</span>
          </p>
          <p>
            Weather: {weatherData.main.pressure}
            <span>Pa</span>
          </p>
        </div>
      </StyledWeatherInfoDiv>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
