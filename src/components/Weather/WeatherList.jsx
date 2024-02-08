// WeatherList.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../redux/selectors";
import sprite from "../../images/sprite.svg";
import { ListWrapper, SvgCross, WrapperSvg } from "./WeatherList.styles";
import { removeFromFavorites } from "../redux/slice";
import { nanoid } from "nanoid";

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

  return (
    // <ListWrapper>
    //   {favoriteWeather.map((favorite) => (
    //     <div key={favorite.id}>
    //       <WrapperSvg>
    //         <SvgCross onClick={() => handleRemoveItem(favorite.id)}>
    //           <use href={`${sprite}#icon-cross`}></use>
    //         </SvgCross>
    //       </WrapperSvg>
    //       <h3>Name: {favorite.city.name}</h3>
    //       <p>Temperature: {favorite.list[0].main.temp} °C</p>
    //       <p>Feels like: {favorite.list[0].main.feels_like} °C</p>
    //       <p>Humidity: {favorite.list[0].main.humidity}%</p>
    //       <p>Weather: {favorite.list[0].weather[0].description}</p>
    //       <p>Wind Speed: {favorite.list[0].wind.speed} m/s,</p>
    //     </div>
    //   ))}
    // </ListWrapper>
    <ListWrapper>
      {favoriteWeather.map((favorite, index) => (
        <div key={index}>
          <WrapperSvg>
            <SvgCross onClick={() => handleRemoveItem(index)}>
              <use href={`${sprite}#icon-cross`}></use>
            </SvgCross>
          </WrapperSvg>
          <h3>Name: {favorite.city.name}</h3>
          <p>Temperature: {favorite.list[0].main.temp} °C</p>
          <p>Feels like: {favorite.list[0].main.feels_like} °C</p>
          <p>Humidity: {favorite.list[0].main.humidity}%</p>
          <p>Weather: {favorite.list[0].weather[0].description}</p>
          <p>Wind Speed: {favorite.list[0].wind.speed} m/s,</p>
        </div>
      ))}
    </ListWrapper>
  );
};

export default WeatherList;
