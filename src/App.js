import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);



  const API_KEY = "b25600c4904de7037e27031b32394356"; 

  const fetchWeather = async (cityName) => {
    if (!cityName) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
        if (!history.includes(cityName)) {
          const updated = [cityName, ...history.slice(0, 4)];
          setHistory(updated);
        }
      } else {
        setError(data.message || "City not found.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gradient-to-br from-sky-100 via-blue-200 to-blue-400">
      <h1 className="text-2xl font-bold my-4">Weather Dashboard</h1>
  
      {/* Centered SearchBar */}
      <div className="flex justify-center w-full max-w-2xl mb-4">
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => fetchWeather(city)}
        />
      </div>
      {!weather && (
  <div className="mt-6 text-center text-gray-700 bg-white/60 rounded-xl shadow p-6 backdrop-blur-sm">
    <div className="text-4xl mb-2">🌤️</div>
    <h2 className="text-xl font-semibold text-blue-800">Welcome to the Weather Dashboard</h2>
    <p className="mt-1 text-sm text-gray-600">
      Search a city to get the latest weather updates
    </p>
  </div>
)}
  
      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
  
      {/* Main content: Weather card & Recent history */}
      <div className="flex w-full max-w-5xl items-start gap-6 mt-6">
        {/* Left: WeatherCard */}
        <div className="flex-1">
        {weather && (
  <div className="bg-white rounded-2xl shadow-2xl p-6 transition-all duration-300">
    <WeatherCard
      data={weather}
      onRefresh={() => fetchWeather(weather.name)}
    />
  </div>
)}

        </div>
  
        {/* Right: Recent Searches */}
        {history.length > 0 && (
          <div className="w-60 p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-2 text-center">Recent Searches</h3>
            <ul className="space-y-2">
              {history.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => fetchWeather(item)}
                    className="w-full text-left px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );  
}

export default App;
