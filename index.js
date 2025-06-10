const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "8466805bc7953cb70c116bff309cc16a";
weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city")
    }
});
async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Could not fetch weather information");

    }
    return await response.json();
}
function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity, feels_like }, weather: [{ description, id }] } = data;
    card.textContent = "";
    card.style.display = "flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const feelsLike = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`
    feelsLike.textContent = `Feels Like:${(feels_like - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    WeatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    feelsLike.classList.add("humidityDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    WeatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsLike);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(WeatherEmoji);
}
function getWeatherEmoji(WeatherId) {
    switch (true) {
        case (WeatherId >= 200 && WeatherId < 300):
            return "⛈️";
        case (WeatherId >= 300 && WeatherId < 400):
            return "☔";
        case (WeatherId >= 500 && WeatherId < 600):
            return "☔";
        case (WeatherId >= 600 && WeatherId < 700):
            return "🌨️";
        case (WeatherId >= 700 && WeatherId < 800):
            return "🌫️";
        case (WeatherId === 800):
            return "☀️";
        case (WeatherId >= 801 && WeatherId < 810):
            return "☁️";
        default:
            return "Run for your lives!";


    }

}
function displayError(message) {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}