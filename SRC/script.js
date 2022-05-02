// display city name at top with date
function check(event) {
  event.preventDefault();
  let justChecked = document.querySelector("div.display-city");
  let userSearched = document.querySelector("#user-typed");

  justChecked.innerHTML = " in " + userSearched.value;
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
    let currentTemp = Math.round(response.data.main.temp);
    let tempNow = document.querySelector("#tempNow");

    let currentHumidity = Math.round(response.data.main.humidity);
    let humidityNow = document.querySelector("#humidity");

    let currentWind = Math.round(response.data.wind.speed);
    let windNow = document.querySelector("#wind");

    let currentSky = response.data.weather[0].description;
    let skyNow = document.querySelector("#cloud");

    tempNow.innerHTML = currentTemp;
    humidityNow.innerHTML = currentHumidity + "%";
    windNow.innerHTML = currentWind + " mph";
    skyNow.innerHTML = currentSky;

    console.log(response);
  }
}

function showSwell(response) {
  let waveHeight = response.data[0].name;
  let waveNow = document.querySelector("#bouy");
  waveNow.innerHTML = waveHeight;
}

//move all date conversion into a function for cleaner code??
//need to update date/time based on current searched location-does open weather have element?
let now = new Date();

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
if (time < 10) {
  time = "0" + time;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = "0" + time;
}
let date = document.querySelector("div.date");
date.innerHTML = day + " " + time + ":" + minute + " ";

let form = document.querySelector("#city-check");
form.addEventListener("submit", check);

// get current data from OpenWeather

let city = document.querySelector("#city-check");
city.addEventListener("submit", getApi);

//testing buoy data
let harvestUrl = "https://jsonplaceholder.typicode.com/users";
axios.get(harvestUrl).then(showSwell);
