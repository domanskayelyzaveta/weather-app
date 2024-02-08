// WeatherList.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../redux/selectors";
import sprite from "../../images/sprite.svg";
import { ListWrapper, SvgCross, WrapperSvg } from "./WeatherList.styles";
import { removeFromFavorites } from "../redux/slice";
import { nanoid } from "nanoid";
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

// const WeatherList = ({ weatherData }) => {
//   const favoriteWeather = useSelector(selectFavorites);
//   console.log("FFFFFF", favoriteWeather);

//   if (
//     !weatherData ||
//     !weatherData.main ||
//     !weatherData.weather ||
//     !weatherData.wind
//   ) {
//     return <div>No weather data available</div>;
//   }

//   return (
//     <div>
//       <h3>Name:{favoriteWeather[0].city.name}</h3>
//       <p>Temperature: {weatherData.main.temp} °C</p>
//       <p>Feels like: {weatherData.main.feels_like} °C</p>
//       <p>Humidity: {weatherData.main.humidity}%</p>
//       <p>Weather: {weatherData.weather[0].description}</p>
//       <p>
//         Wind Speed: {weatherData.wind.speed} m/s, Direction:{" "}
//         {weatherData.wind.deg}°
//       </p>
//     </div>
//   );
// };

// export default WeatherList;

const WeatherList = ({ weatherData }) => {
  const favoriteWeather = useSelector(selectFavorites);
  console.log("FFFFFF", favoriteWeather);
  const dispatch = useDispatch();
  const [unit, setUnit] = useState("celsius");

  const icon = favoriteWeather[0].list[0].weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

  const weatherStatus = favoriteWeather[0].list[0].weather[0].main;

  const sunnyWeatherStatus =
    weatherStatus === "Clear" ? "Sunny" : weatherStatus;

  const formatDate = (dateString) => {
    const date = moment(dateString);
    const formattedDate = date.format("ddd, D MMMM, HH:mm");

    return formattedDate;
  };

  const originalDate = favoriteWeather[0].list[0].dt_txt;
  const formattedDate = formatDate(originalDate);

  const convertTemperature = (value) => {
    if (unit === "celsius") {
      return value;
    } else {
      return Math.round((value * 9) / 5 + 32);
    }
  };

  // console.log(favoriteWeather.city.id);
  //   return (
  //     <ListWrapper>
  //       {favoriteWeather.map((favorite, index) => (
  //         <div key={index}>
  //           <WrapperSvg>
  //             <SvgCross onClick={handleRemoveItem(favorite)}>
  //               <use href={`${sprite}#icon-cross`}></use>
  //             </SvgCross>
  //           </WrapperSvg>
  //           <h3>Name: {favorite.city.name}</h3>
  //           <p>Temperature: {favorite.list[0].main.temp} °C</p>
  //           <p>Feels like: {favorite.list[0].main.feels_like} °C</p>
  //           <p>Humidity: {favorite.list[0].main.humidity}%</p>
  //           <p>Weather: {favorite.list[0].weather[0].description}</p>
  //           <p>Wind Speed: {favorite.list[0].wind.speed} m/s,</p>
  //         </div>
  //       ))}
  //     </ListWrapper>
  //   );
  // };

  // const handleRemoveItem = (id) => {
  //   console.log("ID:", id);
  //   dispatch(removeFromFavorites(id));
  // };

  const handleRemoveItem = (index) => {
    dispatch(removeFromFavorites(index));
  };

  if (favoriteWeather.length === 0) {
    return <div>No favorite weather data available</div>;
  }

  return (
    <div>
      {favoriteWeather.map((favorite, index) => (
        <WeatherCardWrapper key={index}>
          <StyledTitleWrapper>
            <TitleH2>{favorite.city.name}</TitleH2>
            <SvgCross onClick={() => handleRemoveItem(index)}>
              <use href={`${sprite}#icon-cross`}></use>
            </SvgCross>
            <StyledImgSunDiv>
              <Img src={iconUrl} alt="sun" />
              <ParagraphSun>{sunnyWeatherStatus}</ParagraphSun>
            </StyledImgSunDiv>
          </StyledTitleWrapper>
          <DateParagraph>{formattedDate}</DateParagraph>
          {/* <StyledChartDiv>
            <Chart />
          </StyledChartDiv> */}
          <StyledWeatherInfoDiv>
            <div>
              <StyledTemperature>
                {Math.round(convertTemperature(favorite.list[0].main.temp))}
              </StyledTemperature>
              <p>
                Feels like:
                {Math.round(
                  convertTemperature(favorite.list[0].main.feels_like)
                )}
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
                Wind: {favorite.list[0].wind.speed} <span>m/s</span>
              </p>
              <p>
                Humidity: {favorite.list[0].main.humidity}
                <span>%</span>
              </p>
              <p>
                Humidity: {favorite.list[0].main.pressure}
                <span>Pa</span>
              </p>
            </div>
          </StyledWeatherInfoDiv>
        </WeatherCardWrapper>
      ))}
    </div>
  );
};

export default WeatherList;
