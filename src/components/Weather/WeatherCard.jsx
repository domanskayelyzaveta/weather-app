import { useSelector } from "react-redux";
import { selectLoader, selectWeather } from "../redux/selectors";
import {
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
import Chart from "../Chart/Chart";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { convertTemperature } from "../../helpers";
import Loader from "../Loader/Loader";
import FormattedDate from "../../formatteDate";

const WeatherCard = ({ weatherData }) => {
  const { t } = useTranslation();

  const weather = useSelector(selectWeather);
  const isLoading = useSelector(selectLoader);

  const [unit, setUnit] = useState("celsius");

  const weatherStatus = weatherData?.weather[0]?.main;
  const icon = weatherData?.weather[0]?.icon;

  const cityName = weather?.city?.name;
  const country = weather?.city?.country;
  const temp =
    weather?.list?.[0]?.main?.temp !== undefined
      ? weather.list[0].main.temp
      : null;
  const weatherIco = weather?.list?.[0]?.weather[0]?.icon;
  const weatherStat = weather?.list?.[0]?.weather[0]?.main;
  const wind = weather?.list?.[0]?.wind.speed;
  const humidity = weather?.list?.[0]?.main.humidity;
  const pressure = weather?.list?.[0]?.main.pressure;
  const feelsLike = weather?.list?.[0]?.main?.feels_like;
  const chartWeather = weather?.list;

  const originalDate = weather?.list?.[0].dt_txt;

  const iconUrl = `http://openweathermap.org/img/wn/${weatherIco || icon}.png`;

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

  const statusWeather = weatherStat === "Clear" ? t("Sunny") : t(weatherStat);

  const tempValue =
    temp !== null && temp !== undefined ? temp : weatherData.main.temp;
  const temperature = Math.round(convertTemperature(tempValue, unit));
  const temperatureSign = temperature === 0 ? "" : temperature < 0 ? "-" : "+";

  const temperatureAbs = Math.abs(temperature);

  const cardBackgroundColor = temperatureSign === "-" ? "#F1F2FF" : "#FFFAF1";
  const spanColor = temperatureSign === "-" ? "#459DE9" : "#FFA25B";

  return isLoading ? (
    <Loader />
  ) : (
    <WeatherCardWrapper backgroundColor={cardBackgroundColor}>
      <StyledTitleWrapper>
        <TitleH2>
          {cityName || weatherData.name}, {country || weatherData.sys.country}
        </TitleH2>
        <StyledImgSunDiv>
          <Img src={iconUrl} alt="sun" />
          <ParagraphSun>{statusWeather || sunnyWeatherStatus}</ParagraphSun>
        </StyledImgSunDiv>
      </StyledTitleWrapper>

      <FormattedDate dateString={originalDate} />

      <StyledChartDiv>
        <Chart data={chartWeather} unit={unit} />
      </StyledChartDiv>

      <StyledWeatherInfoDiv>
        <TemperatureDiv>
          <StyledTemperature>
            {temperatureSign}
            {temperatureAbs}
          </StyledTemperature>

          <StyledFeelsPar>
            {t("feels_like")}:&nbsp;
            <DegSpan>
              {Math.round(convertTemperature(feelsLike, unit)) ||
                Math.round(
                  convertTemperature(weatherData.main.feels_like, unit)
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
              {wind || weatherData.wind.speed}m/s
            </OrangeSpan>
          </MainWeatherInfoP>
          <MainWeatherInfoP>
            {t("humidity")}: &nbsp;
            <OrangeSpan color={spanColor}>
              {humidity || weatherData.main.humidity}%
            </OrangeSpan>
          </MainWeatherInfoP>
          <MainWeatherInfoP>
            {t("pressure")}: &nbsp;
            <OrangeSpan color={spanColor}>
              {pressure || weatherData.main.pressure}Pa
            </OrangeSpan>
          </MainWeatherInfoP>
        </WeatherInfoDiv>
      </StyledWeatherInfoDiv>
    </WeatherCardWrapper>
  );
};

export default WeatherCard;
