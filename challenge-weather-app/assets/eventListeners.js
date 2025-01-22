import {
  weatherOverlay,
  weatherDescription,
  weatherTemp,
  cityInput,
} from "./domSelectors.js";
import { fetchWeatherData } from "./weatherService.js";
import { fetchPhoto } from "./photoService.js";
import { handleError } from "./utils.js";

document
  .getElementById("search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (!city) return;

    try {
      // Fetch weather data
      const { weatherCondition, temperature } = await fetchWeatherData(city);

      weatherDescription.textContent = `Weather in ${city}: ${weatherCondition}`;
      weatherTemp.textContent = `Temperature: ${temperature}°C`;

      // Fetch Unsplash photo
      const photoUrl = await fetchPhoto(city, weatherCondition);
      document.body.style.backgroundImage = photoUrl
        ? `url('${photoUrl}')`
        : "none";
    } catch (error) {
      weatherDescription.textContent = "Error fetching data. Please try again.";
      handleError(error);
    }
  });
