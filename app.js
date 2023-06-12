const weatherButton = document.querySelector(".show-weather");
weatherButton.addEventListener("click", showWeatherInfo);

function showWeatherInfo() {
  const inputValue = document.querySelector("input").value;
  if (inputValue != "") {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" +
        inputValue
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherDescription = data.weather[0].description;
        let iconWeather = "";

        switch (weatherDescription) {
          case "clear sky":
            iconWeather = '<i class="fas fa-sun"></i>';
            break;
          case "few clouds":
            iconWeather = '<i class="fas fa-cloud-sun"></i>';
            break;
          case "scattered clouds":
            iconWeather = '<i class="fas fa-cloud"></i>';
            break;
          case "broken clouds":
            iconWeather = '<i class="fas fa-clouds"></i>';
            break;
          case "broken clouds":
            iconWeather = '<i class="fas fa-cloud-sun"></i>';
            break;
          case "overcast clouds":
            iconWeather = '<i class="fas fa-cloud"></i>';
            break;
          case "light rain":
            iconWeather = '<i class="fas fa-cloud-rain"></i>';
            break;
          case "shower rain":
            iconWeather = '<i class="fas fa-cloud-showers-heavy"></i>';
            break;
          case "rain":
            iconWeather = '<i class="fas fa-cloud-rain"></i>';
            break;
          case "thunderstorm":
            iconWeather = '<i class="fas fa-bolt"></i>';
            break;
          case "snow":
            iconWeather = '<i class="fas fa-snowflake"></i>';
            break;
          case "mist":
            iconWeather = '<i class="fas fa-smog"></i>';
            break;
          default:
            iconWeather = '<i class="fas fa-question"></i>';
            break;
        }
        let template = `
                    <span class="description">
                    Descriere: ${data.weather[0].description}</span>
                    ${iconWeather}
                    <p class="humidity">Umiditate: ${data.main.humidity}</p>
                    <p class="pressure">Presiune: ${data.main.pressure}</p>
                    <p class="temperature">Temperatura curenta: ${data.main.temp}</p>
                    <p class="min-temperature">Minima zilei: ${data.main.temp_min}</p>
                    <p class="max-temperature">Maxima zilei: ${data.main.temp_max}</p>`;

        const weatherInfo = document.querySelector(".weather-now");
        weatherInfo.innerHTML = template;
      });
  }
}

const prognosisButton = document.querySelector(".show-prognosis");
prognosisButton.addEventListener("click", showWeatherPrognosis);

function showWeatherPrognosis() {
  const inputValue = document.querySelector("input").value;
  if (inputValue !== "") {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" +
        inputValue
    )
      .then((response) => response.json())
      .then((data) => {
        const templates = {};
        data.list.forEach((element) => {
          const dateTime = new Date(element.dt_txt);
          const year = dateTime.getUTCFullYear();
          const month = (dateTime.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0");
          const day = dateTime.getUTCDate().toString().padStart(2, "0");
          const date = `${year}-${month}-${day}`;

          if (!templates[date]) {
            templates[date] = "";
          }

          const hour = dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const weatherDescription = element.weather[0].description;
          let icon = "";

          switch (weatherDescription) {
            case "clear sky":
              icon = '<i class="fas fa-sun"></i>';
              break;
            case "few clouds":
              icon = '<i class="fas fa-cloud-sun"></i>';
              break;
            case "scattered clouds":
              icon = '<i class="fas fa-cloud"></i>';
              break;
            case "broken clouds":
              icon = '<i class="fas fa-clouds"></i>';
              break;
            case "broken clouds":
              icon = '<i class="fas fa-clouds"></i>';
              break;
            case "overcast clouds":
              icon = '<i class="fas fa-cloud"></i>';
              break;
            case "light rain":
              icon = '<i class="fas fa-cloud-rain"></i>';
              break;
            case "shower rain":
              icon = '<i class="fas fa-cloud-showers-heavy"></i>';
              break;
            case "rain":
              icon = '<i class="fas fa-cloud-rain"></i>';
              break;
            case "thunderstorm":
              icon = '<i class="fas fa-bolt"></i>';
              break;
            case "snow":
              icon = '<i class="fas fa-snowflake"></i>';
              break;
            case "mist":
              icon = '<i class="fas fa-smog"></i>';
              break;
            default:
              icon = '<i class="fas fa-question"></i>';
              break;
          }
          let template = `
              <div class="col-2 date-column">
                <p class="day-prognosis">${date}</p>
                <p class="hour">Ora: ${hour}</p>
                <p class="temperature-prognosis">Temperatura: ${element.main.temp}</p>
                <p class="description-prognosis">Descriere: ${element.weather[0].description}</p>
                <div class="weather-icon">${icon}</div>
              </div>`;

          templates[date] += template;
        });

        let joinedTemplate = "";
        Object.keys(templates).forEach((date) => {
          const rowTemplate = `<div class="row my-3">${templates[date]}</div>`;
          joinedTemplate += rowTemplate;
        });

        const prognosisData = document.querySelector(".weather-prognosis");
        prognosisData.innerHTML = joinedTemplate;
      });
  }
}
