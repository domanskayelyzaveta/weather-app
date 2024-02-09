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
import { useTranslation } from "react-i18next";

const WeatherCard = ({ weatherData }) => {
  const { t } = useTranslation();

  const weather = useSelector(selectWeather);
  console.log("CADR:", weather.list);

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
        <Chart data={weather.list} />
      </StyledChartDiv>

      <StyledWeatherInfoDiv>
        <div>
          <StyledTemperature>
            {Math.round(convertTemperature(weatherData.main.temp))}
          </StyledTemperature>
          <p>
            {t("feels_like")}:
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
            {t("wind")}: {weatherData.wind.speed} <span>m/s</span>
          </p>
          <p>
            {t("humidity")}: {weatherData.main.humidity}
            <span>%</span>
          </p>
          <p>
            {t("pressure")}: {weatherData.main.pressure}
            <span>Pa</span>
          </p>
        </div>
      </StyledWeatherInfoDiv>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
