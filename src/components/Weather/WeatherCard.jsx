// import React from "react";
import { useSelector } from "react-redux";
import { selectWeather } from "../redux/selectors";
import {
  DateParagraph,
  DegSpan,
  DegSwitcherDiv,
  Img,
  MainWeatherInfoP,
  OrangeSpan,
  ParagraphSun,
  StyledChartDiv,
  StyledDegreeBtn,
  StyledFeelsPar,
  StyledImgSunDiv,
  StyledTemperature,
  StyledTitleWrapper,
  StyledWeatherInfoDiv,
  TemperatureDiv,
  TitleH2,
  WeatherCardWrapper,
  WeatherInfoDiv,
} from "./WeatherCard.styled";
// import moment from "moment";
import Chart from "../Chart/Chart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { formatDate, convertTemperature } from "../../helpers";

const WeatherCard = ({ weatherData }) => {
  const { t } = useTranslation();

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
    weatherStatus === "Clear" ? t("Sunny") : t(weatherStatus);

  // const formatDate = (dateString) => {
  //   const date = moment(dateString);
  //   const formattedDate = date.format("ddd, D MMMM, HH:mm");

  //   return formattedDate;
  // };

  const originalDate = weatherData?.dt_txt;
  const formattedDate = formatDate(originalDate);

  const temperature = convertTemperature(weatherData.main.temp, unit);
  const feelsLikeTemperature = convertTemperature(
    weatherData.main.feels_like,
    unit
  );

  // const convertTemperature = (value) => {
  //   if (unit === "celsius") {
  //     return value;
  //   } else {
  //     return Math.round((value * 9) / 5 + 32);
  //   }
  // };

  const cardBackgroundColor =
    Math.round(convertTemperature(weatherData.main.temp)) < 0
      ? "#F1F2FF"
      : "#FFFAF1";

  const spanColor =
    Math.round(convertTemperature(weatherData.main.temp)) < 0
      ? "#459DE9"
      : "#FFA25B";

  return (
    <WeatherCardWrapper backgroundColor={cardBackgroundColor}>
      <StyledTitleWrapper>
        <TitleH2>
          {cityName || weatherData.name}, {country || weatherData.sys.country}
        </TitleH2>
        <StyledImgSunDiv>
          <Img src={iconUrl} alt="sun" />
          <ParagraphSun>{sunnyWeatherStatus}</ParagraphSun>
        </StyledImgSunDiv>
      </StyledTitleWrapper>

      <DateParagraph>{formattedDate}</DateParagraph>

      <StyledChartDiv>
        <Chart data={weather.list} />
      </StyledChartDiv>

      <StyledWeatherInfoDiv>
        <TemperatureDiv>
          <StyledTemperature>
            {Math.round(convertTemperature(temperature, unit)) > 0
              ? "+" + Math.round(convertTemperature(temperature, unit))
              : Math.round(convertTemperature(temperature, unit))}
          </StyledTemperature>

          <StyledFeelsPar>
            {t("feels_like")}:&nbsp;
            <DegSpan>
              {Math.round(convertTemperature(feelsLikeTemperature))}
              &nbsp;
              {unit === "celsius" ? "°C" : "°F"}
            </DegSpan>
          </StyledFeelsPar>

          <DegSwitcherDiv>
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
          </DegSwitcherDiv>
        </TemperatureDiv>

        <WeatherInfoDiv>
          <MainWeatherInfoP>
            {t("wind")}: &nbsp;
            <OrangeSpan color={spanColor}>
              {weatherData.wind.speed}m/s
            </OrangeSpan>
          </MainWeatherInfoP>
          <MainWeatherInfoP>
            {t("humidity")}: &nbsp;
            <OrangeSpan color={spanColor}>
              {weatherData.main.humidity}%
            </OrangeSpan>
          </MainWeatherInfoP>
          <MainWeatherInfoP>
            {t("pressure")}: &nbsp;
            <OrangeSpan color={spanColor}>
              {weatherData.main.pressure}Pa
            </OrangeSpan>
          </MainWeatherInfoP>
        </WeatherInfoDiv>
      </StyledWeatherInfoDiv>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
