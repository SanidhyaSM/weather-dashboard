import React from "react";

function WeatherCard({ data, onRefresh }) {
  const { name, main, weather, wind } = data;
  const icon = weather[0]?.icon;

  return (
    <div className="bg-white p-4 mt-6 rounded shadow w-80">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">{name}</h2>
        <button
  onClick={onRefresh}
  className="mt-2 px-3 py-1 bg-blue-100 text-sm text-blue-700 rounded hover:bg-blue-200 transition"
>
  🔄 Refresh
</button>


      </div>
      <div className="flex items-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
        <div>
          <p className="text-2xl">{main.temp}°C</p>
          <p className="capitalize">{weather[0].description}</p>
        </div>
      </div>
      <div className="mt-4 text-sm">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind Speed: {wind.speed} km/h</p>
      </div>
    </div>
  );
}

export default WeatherCard;
