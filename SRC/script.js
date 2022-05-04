// display city name at top with date
function check(event) {
  event.preventDefault();
  let justChecked = document.querySelector("div.display-city");
  let userSearched = document.querySelector("#user-typed");

  justChecked.innerHTML = userSearched.value + " weather as of ";
}

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

//Current weather from OpenWeather Function:

function getApi(event) {
  let apiKey = "032e8a8762076f19419119384173a976";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  //city needs to be input value from user
  city = document.querySelector("#user-typed");

  axios
    .get(apiUrl + city.value + "&appid=" + apiKey + "&units=imperial")
    .then(showWeather);

  function showWeather(response) {
    let timestamp = response.data.dt * 1000;
    let dateNow = document.querySelector("#date-now");

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
    tempNow.innerHTML = currentTemp;
    minNow.innerHTML = minTemp;
    document.querySelector("#max-temp").innerHTML = Math.round(
      response.data.main.temp_max
    );
    humidityNow.innerHTML = currentHumidity + "%";
    windNow.innerHTML = currentWind + " mph";
    skyNow.innerHTML = currentSky;

    console.log(response);
    console.log(response.data.dt);
  }
}

//move all date conversion into a function for cleaner code??
//need to update date/time based on current searched location-does open weather have element?

// get current data from OpenWeather

let city = document.querySelector("#city-check");
city.addEventListener("submit", getApi);

let form = document.querySelector("#city-check");
form.addEventListener("submit", check);
