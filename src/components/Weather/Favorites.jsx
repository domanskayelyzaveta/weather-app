// // import React from "react";
// // import { useSelector } from "react-redux";
// // import WeatherCard from "../Weather/WeatherCard";
// // import { selectFavorites } from "../redux/selectros";
// // import { nanoid } from "nanoid";

// import { nanoid } from "nanoid";
// import WeatherCard from "./WeatherCard";
// import { useSelector } from "react-redux";
// import { selectFavorites } from "../redux/selectors";
// import WeatherList from "./WeatherList";

// // const FavoritesList = () => {
// //   const favoriteWeather = useSelector(selectFavorites);
// //   const list = favoriteWeather[0].list[0];
// //   console.log("LIST", list);

// //   console.log("favoriteWeather:", favoriteWeather);
// //   return (
// //     <div>
// //       <h2>Favorites</h2>
// //       <ul>
// //         {favoriteWeather?.map((weatherData) => (
// //           <WeatherCard key={nanoid()} weatherData={weatherData} />
// //         ))}
// //       </ul>

// //       <div>
// //         {/* <h3>{list.dt_txt}</h3> */}
// //         {/* <p>Temperature: {favoriteWeather.city} °C</p> */}
// //         {/* <p>Feels like: {favoriteWeather.main.feels_like} °C</p>
// //         <p>Humidity: {favoriteWeather.main.humidity}%</p>
// //         <p>Weather: {favoriteWeather.weather[0].description}</p>
// //         <p>
// //           Wind Speed: {favoriteWeather.wind.speed} m/s, Direction:{" "}
// //           {favoriteWeather.wind.deg}°
// //         </p> */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default FavoritesList;

// const FavoritesList = () => {
//   const favoriteWeather = useSelector(selectFavorites);

//   return (
//     <div>
//       {/* <h2>Favorites</h2>
//       <ul>
//         {favoriteWeather?.map((favorite) => {
//           console.log("favorites:", favorite.list[0]);
//           console.log("city:", favorite.city.name);
//           //   return <WeatherCard key={nanoid()} weatherData={favorite.list[0]} />;
//           return <WeatherList key={nanoid()} weatherData={favorite.list[0]} />;
//         })}
//       </ul> */}
//     </div>
//   );
// };

// //   return (
// //     <div>
// //       <h2>Favorites</h2>
// //       <ul>
// //         {favoriteWeather?.map(({ list, city }) => {
// //           return <WeatherCard key={nanoid()} list={list[0]} city={city} />;
// //         })}
// //       </ul>
// //     </div>
// //   );
// // };

// export default FavoritesList;
