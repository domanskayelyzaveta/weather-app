import React, { useState } from "react";
import WeatherList from "./components/Weather/WeatherList";
import { useDispatch } from "react-redux";
import { addToFavorites } from "./components/redux/slice";
import SearchBar from "./components/SearchBar/SearchBar";
import FavoritesList from "./components/Weather/Favorites";
import WeatherCard from "./components/Weather/WeatherCard";

const App = () => {
  const [cities, setCities] = useState([]);

  const dispatch = useDispatch();

  // const handleAddToFavorites = (cityName) => {
  //   const city = cities.find((city) => city.name === cityName);
  //   if (city) {
  //     const updatedCities = cities.map((c) =>
  //       c.name === cityName ? { ...c, isFavorite: true } : c
  //     );
  //     setCities(updatedCities);
  //     dispatch(addToFavorites(cityName));
  //   }
  // };

  const handleAddToFavorites = (cityData) => {
    // Uncomment the relevant lines to update the cities state
    // const cityIndex = cities.findIndex((city) => city.name === cityData.name);
    // if (cityIndex !== -1) {
    //   const updatedCities = [...cities];
    //   updatedCities[cityIndex] = {
    //     ...updatedCities[cityIndex],
    //     isFavorite: true,
    //   };
    //   setCities(updatedCities);
    //   dispatch(addToFavorites(cityData));
    // }

    setCities([...cities, cityData]);
    // dispatch(addToFavorites(cityData));
  };

  return (
    <div className="app">
      <h1>Погода</h1>
      <SearchBar cities={cities} />
      <WeatherCard />
      <WeatherList cities={cities} />
      <FavoritesList />
    </div>
  );
};

export default App;

// onAddToFavorites = { handleAddToFavorites };
