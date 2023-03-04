let weather = {
  apiKey: '80831a2c3c8f84496e1976aa24665ca4',
  currentCity: '',
  getCity() {
    const searchInput = document.querySelector('.search-bar');
    const searchButton = document.querySelector('.search-btn');
    searchButton.addEventListener('click', () => {
      this.currentCity = searchInput.value;
      console.log(this.currentCity);
      this.fetchWeather(this.currentCity);
    });
  },

  fetchWeather(city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((weatherData) => this.displayWeather(weatherData))
      .catch((error) => console.error(error));
  },
  displayWeather(weatherData) {
    const { name } = weatherData;
    const { icon, description } = weatherData.weather[0];
    const { temp, humidity } = weatherData.main;
    const { speed } = weatherData.wind;
    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector('.city-heading').innerText = `Weather in ${name}`;
    document.querySelector('.temperature').textContent = `${Math.floor(
      temp
    )}°C`;
    document.querySelector(
      '.weather-icon'
    ).src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    const descriptionHTML = document.querySelector('.description');
    descriptionHTML.innerText = description;
    document.querySelector('.humidity').innerText = `Humidity: ${humidity} %`;
    document.querySelector('.wind').innerText = `Wind speed: ${speed} km/h`;
  },
};

weather.fetchWeather('Los Angeles');
weather.getCity();
