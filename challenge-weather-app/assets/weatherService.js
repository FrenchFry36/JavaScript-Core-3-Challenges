const apiKeyWeather = "0e587ba22a965cb782ddc86ec62d0546"; // OpenWeather API key

export async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=metric`
  );
  const data = await response.json();

  if (data.cod !== 200) {
    throw new Error(data.message);
  }

  return {
    weatherCondition: data.weather[0].main.toLowerCase(),
    temperature: data.main.temp,
  };
}
