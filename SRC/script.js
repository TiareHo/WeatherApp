function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friyay!",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let time = now.getHours();
  if (time <= 9) {
    time = "0" + time;
  }
  let minute = now.getMinutes();
  if (minute <= 9) {
    minute = "0" + time;
  }
  return time + ":" + minute + " " + day + ":";
}

//function to send searched city name to main showWeather:

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#user-typed");
  getResponse(city.value);
}

function getResponse(city) {
  let apiKey = "032e8a8762076f19419119384173a976";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  //city needs to be input value from user?
  axios
    .get(apiUrl + city + "&appid=" + apiKey + "&units=imperial")
    .then(showWeather);
}

function showWeather(response) {
  let timestamp = response.data.dt * 1000;
  let dateNow = document.querySelector("#date-now");

  let justChecked = document.querySelector("div.display-city");
  let city = document.querySelector("#user-typed");
  let icon = document.querySelector("#bgimg");
  let emoji = response.data.weather[0].icon;

  let currentTemp = Math.round(response.data.main.temp);
  let tempNow = document.querySelector("#tempNow");

  let minTemp = Math.round(response.data.main.temp_min);
  let minNow = document.querySelector("#min-temp");

  let currentHumidity = Math.round(response.data.main.humidity);
  let humidityNow = document.querySelector("#humidity");

  let currentWind = Math.round(response.data.wind.speed);
  let windNow = document.querySelector("#wind");

  let currentSky = response.data.weather[0].description;
  let skyNow = document.querySelector("#cloud");

  dateNow.innerHTML = formatDate(timestamp);
  justChecked.innerHTML = city.value + " weather as of ";
  icon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + emoji + "@2x.png"
  );
  icon.setAttribute("alt", response.data.weather[0].main);
  tempNow.innerHTML = currentTemp;
  minNow.innerHTML = minTemp;
  document.querySelector("#max-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  humidityNow.innerHTML = currentHumidity + "%";
  windNow.innerHTML = currentWind + " mph";
  skyNow.innerHTML = currentSky;

  getForecast(response.data.coord);
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friyay!",
    "Saturday",
  ];
  return days[day];
}

function showForecast(response) {
  let forecast = document.querySelector("#future-conditions-javascript");
  let forecastHTML = `<h3> CRYSTAL BALL READINGS </h3> <div class="row future-conditions">`;
  let days = response.data.daily;

  days.forEach(function (days, index) {
    if ((index > 0) & (index < 5)) {
      forecastHTML =
        forecastHTML +
        `<div class="sm col-3">
        <div class="forecast-day"> ${formatForecastDate(days.dt)} </div>
           <img
             src= "http://openweathermap.org/img/wn/${
               days.weather[0].icon
             }@2x.png"
              alt="weather image"
             />
             <div id="future-temps">
              <span id="future-temp-high"> ${Math.round(
                days.temp.max
              )}°F | </span><span id-"future-temp-low">${Math.round(
          days.temp.min
        )}°F </span>
        </div>     
     </div>         
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
  console.log(response.data);
}

function getForecast(coord) {
  let lat = coord.lat;
  let lon = coord.lon;

  console.log(lon + "," + lat);
  let apiKey = "398e05bad3172be5f1fd3b3b7b027909";
  let apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  axios
    .get(
      apiURL +
        lat +
        "&lon=" +
        lon +
        "&exclude=hourly&appid=" +
        apiKey +
        "&units=imperial"
    )
    .then(showForecast);
}
let city = "Santa Barbara";
getResponse(city);
// glistens for user input to begin function response chain
let search = document.querySelector("#city-check");
search.addEventListener("submit", handleSearch);
