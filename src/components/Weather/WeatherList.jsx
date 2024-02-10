import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../redux/selectors";
import sprite from "../../images/sprite.svg";
import { removeFromFavorites } from "../redux/slice";

import {
  DegSpan,
  DegSwitcherDiv,
  FavoriteWrapper,
  Img,
  MainWeatherInfoP,
  OrangeSpan,
  ParagraphSun,
  StyledChartDiv,
  StyledDegreeBtn,
  StyledFeelsPar,
  StyledImgSunDiv,
  StyledSvgDiv,
  StyledTemperature,
  StyledTitleWrapper,
  StyledWeatherInfoDiv,
  SvgCross,
  TemperatureDiv,
  TitleH2,
  WeatherCardWrapper,
  WeatherInfoDiv,
} from "./WeatherCard.styled";
import { useTranslation } from "react-i18next";
import Chart from "../Chart/Chart";
import FormattedDate from "../../formatteDate";

const WeatherList = ({ weatherData }) => {
  const { t } = useTranslation();

  const [unit, setUnit] = useState("celsius");

  const dispatch = useDispatch();

  const favoriteWeather = useSelector(selectFavorites);

  const weatherStatus = favoriteWeather[0].list[0].weather[0].main;

  const sunnyWeatherStatus =
    weatherStatus === "Clear" ? t("Sunny") : t(weatherStatus);

  const originalDate = favoriteWeather[0].list[0].dt_txt;

  const convertTemperature = (value) => {
    if (unit === "celsius") {
      return value;
    } else {
      return Math.round((value * 9) / 5 + 32);
    }
  };

  const handleRemoveItem = (index) => {
    dispatch(removeFromFavorites(index));
  };

  if (favoriteWeather.length === 0) {
    return <div>No favorite weather data available</div>;
  }

  const chartDataArray = favoriteWeather.map((weather) => weather.list);

  return (
    <FavoriteWrapper>
      {favoriteWeather.map((favorite, index) => {
        const cardBackgroundColor =
          Math.round(convertTemperature(favorite.list[0].main.temp)) < 0
            ? "#F1F2FF"
            : "#FFFAF1";
        const spanColor =
          Math.round(convertTemperature(favorite.list[0].main.temp)) < 0
            ? "#459DE9"
            : "#FFA25B";
        return (
          <WeatherCardWrapper key={index} backgroundColor={cardBackgroundColor}>
            <StyledSvgDiv>
              <SvgCross onClick={() => handleRemoveItem(index)}>
                <use href={`${sprite}#icon-cross`}></use>
              </SvgCross>
            </StyledSvgDiv>
            <StyledTitleWrapper>
              <TitleH2>
                {favorite.city.name}, {favorite.city.country}
              </TitleH2>
              <StyledImgSunDiv>
                <Img
                  src={`http://openweathermap.org/img/wn/${favorite.list[0].weather[0].icon}.png`}
                  alt="sun"
                />
                <ParagraphSun>{sunnyWeatherStatus}</ParagraphSun>
              </StyledImgSunDiv>
            </StyledTitleWrapper>

            <FormattedDate dateString={originalDate} />

            <StyledChartDiv>
              <Chart data={chartDataArray[index]} />
            </StyledChartDiv>

            <StyledWeatherInfoDiv>
              <TemperatureDiv>
                <StyledTemperature>
                  {convertTemperature(favorite.list[0].main.temp) > 0
                    ? "+"
                    : ""}
                  {Math.round(convertTemperature(favorite.list[0].main.temp))}
                </StyledTemperature>

                <StyledFeelsPar>
                  {t("feels_like")}:&nbsp;
                  <DegSpan>
                    {Math.round(
                      convertTemperature(favorite.list[0].main.feels_like)
                    )}
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
                    {Math.round(favorite.list[0].wind.speed)}&nbsp;m/s
                  </OrangeSpan>
                </MainWeatherInfoP>
                <MainWeatherInfoP>
                  {t("humidity")}: &nbsp;
                  <OrangeSpan color={spanColor}>
                    {favorite.list[0].main.humidity}%
                  </OrangeSpan>
                </MainWeatherInfoP>
                <MainWeatherInfoP>
                  {t("pressure")}: &nbsp;
                  <OrangeSpan color={spanColor}>
                    {favorite.list[0].main.pressure}Pa
                  </OrangeSpan>
                </MainWeatherInfoP>
              </WeatherInfoDiv>
            </StyledWeatherInfoDiv>
          </WeatherCardWrapper>
        );
      })}
    </FavoriteWrapper>
  );
};

export default WeatherList;
