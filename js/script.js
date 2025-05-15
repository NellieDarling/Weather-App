function displayWeatherInfo(res) {
  const cityEl = document.querySelector("#city");
  const tempEL = document.querySelector("#temperature");
  const iconEl = document.querySelector("#icon");
  const humidityEl = document.querySelector("#humidity");
  const windEl = document.querySelector("#wind");
  const conditionEl = document.querySelector("#condition");
  cityEl.innerHTML = res.data.city;
  tempEL.innerHTML = Math.round(res.data.temperature.current);
  iconEl.src = res.data.condition.icon_url;
  humidityEl.innerHTML = res.data.temperature.humidity;
  windEl.innerHTML = res.data.wind.speed;
  conditionEl.innerHTML = res.data.condition.description;
  getCurrentDay();
  getCurrentTime();
  getForecast(res.data.city);
}

function getCurrentDay() {
  const date = new Date();
  const dayEL = document.querySelector("#day");
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  dayEL.innerHTML = daysOfWeek[date.getDay()];
}

function getCurrentTime() {
  const date = new Date();
  const timeEl = document.querySelector("#time");
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  timeEl.innerHTML = time;
}

function searchCity(city) {
  const apiKey = "9t2b4f04o4ba653b1355ab0efac7c3eb";
  const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayWeatherInfo);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  const searchInputEl = document.querySelector("#search-input");
  searchCity(searchInputEl.value);
}

function getForecast(city) {
  const apiKey = "9t2b4f04o4ba653b1355ab0efac7c3eb";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(res) {
  let forecastEl = document.querySelector("#forecast-container");
  forecastEl.innerHTML = "";

  res.data.daily.forEach((day, index) => {
    if (index < 5) {
      forecastEl.innerHTML += `
      <div class="forecast-item">
        <p class="forecast-day">${formatDate(day.time)}</p>
        <img src="${day.condition.icon_url}" alt="${
        day.condition.description
      }" class="forecast-weather-icon" />
        <div class="forecast-temperatures">
          <p class="forecast-high">${Math.round(day.temperature.maximum)}°</p>
          <p class="forecast-low">${Math.round(day.temperature.minimum)}°</p>
        </div>
      </div>
    `;
    }
  });
  forecastEl;
}

function formatDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysOfWeek[date.getDay()];
}

const searchFormEl = document.querySelector("#search-form");
searchFormEl.addEventListener("submit", handleSearchSubmit);

searchCity("New York");
