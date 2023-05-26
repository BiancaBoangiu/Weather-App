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

        switch (true) {
          case weatherDescription.includes("rain"):
            iconWeather = "fa-solid fa-cloud-rain";
            break;
          case weatherDescription.includes("cloud"):
            iconWeather = "fa-solid fa-cloud";
            break;
          case weatherDescription.includes("sun"):
            iconWeather = "fa-solid fa-sun";
            break;
          case weatherDescription.includes("clear"):
            iconWeather = "fa-shard fa-light fa-cloud-sun";
            break;
          default:
            iconWeather = "fa fa-question";
            break;
        }
        let template = `
                    <p class="description">
                    <i class="${iconWeather}"></i> Descriere: ${data.weather[0].description}</p>
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
  if (inputValue != "") {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" +
        inputValue
    )
      .then((response) => response.json())
      .then((data) => {
        const templates = [];
        data.list.forEach((element) => {
          console.log(element);
          const dateTime = new Date(element.dt_txt);
          const date = dateTime.toLocaleDateString();
          const hour = dateTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          let template = `
                <div class="day">
                    <p class="day-prognosis">${date}</p>
                    <p class="hour">Ora: ${hour}</p>
                    <p class="temperature-prognosis">Temperatura: ${element.main.temp}</p>
                    <p class="description-prognosis">Descriere: ${element.weather[0].description}</p>
                </div>`;

          templates.push(template);
        });

        const joinedTemplate = templates.join("");

        const prognosisData = document.querySelector(".weather-prognosis");
        prognosisData.innerHTML = joinedTemplate;
      });
  }
}
