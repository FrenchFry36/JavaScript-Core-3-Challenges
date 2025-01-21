const inputElement = document.getElementById("search-tf");
const searchButton = document.querySelector(".search__btn");

// function gets lowercase of input value
function getInputValue() {
  let inputValue = inputElement
    ? inputElement.value.toLowerCase()
    : "No input field found";
  console.log("input value: ", inputValue); // logs the value of the input field
  return inputValue; // in case of writing 'Barcelona' returns 'barcelona'
}

// function fils weather url
function getWeatherUrl() {
  const inputValue = getInputValue();

  let weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=0e587ba22a965cb782ddc86ec62d0546`;

  return weatherUrl;
}

// async function for data fetching
async function fetchData(url) {
  let response = await fetch(url); // wait for the fetch to complete
  return await response.json(); // Parse and return the JSON data
}

// async function fetches required value from weather data fetching
async function fetchWeatherData() {
  const weatherUrl = getWeatherUrl();

  try {
    const data = await fetchData(weatherUrl); // fetch the data and wait for it
    const weatherMain = data.weather[0].main; // access the 'main' value from the weather array
    console.log("---> " + weatherMain); // log the weather main value
    return weatherMain.toLowerCase();
  } catch (error) {
    console.error("Error fetching weather data:", error); // handle any errors
    throw error; // re-throw the error for the caller to handle
  }
}

// function fils photos url
async function getPhotosUrl() {
  try {
    const mainValue = await fetchWeatherData();
    const photosUrl = `https://api.unsplash.com/search/photos?query=${mainValue}&client_id=LazB1Bw0iVelhysK3r7TS2l2L-jrnpXWZsTv-x7H7tU`;
    console.log("photos url: ", photosUrl);

    return photosUrl;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// async function fetches required values from photos data fetching
async function fetchPhotosData() {
  try {
    const photosUrl = await getPhotosUrl();
    const data = await fetchData(photosUrl);
    data.results.forEach((photo) => {
      console.log(`Photo by ${photo.user.name}: ${photo.urls.small}`);
    });
  } catch (error) {
    console.error("Error fetching photos data:", error); // Handle errors
  }
}

document.getElementById("search").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  await fetchPhotosData();
});

// const photoResponse = fetch(
//   "https://api.unsplash.com/search/photos?query=snow&client_id=LazB1Bw0iVelhysK3r7TS2l2L-jrnpXWZsTv-x7H7tU"
// )
//   .then((data) => data.json())
//   .then((data) =>
//     data.results.forEach((photo) => {
//       console.log(`Photo by ${photo.user.name}: ${photo.urls.small}`);
//     })
//   );
