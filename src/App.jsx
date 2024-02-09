import React, { useState } from "react";
import WeatherList from "./components/Weather/WeatherList";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar/SearchBar";
import WeatherCard from "./components/Weather/WeatherCard";
import { selectFavorites } from "./components/redux/selectors";
import Header from "./components/Header/Header";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const App = () => {
  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const favorites = useSelector(selectFavorites);

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
    <I18nextProvider i18n={i18n}>
      <div className="app">
        <h1>Погода</h1>

        <Header />
        <SearchBar cities={cities} />
        <WeatherCard />
        {favorites.length > 0 && <WeatherList cities={cities} />}
      </div>
    </I18nextProvider>
  );
};

export default App;

// onAddToFavorites = { handleAddToFavorites };
