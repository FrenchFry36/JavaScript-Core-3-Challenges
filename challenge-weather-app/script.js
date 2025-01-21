const inputElement = document.getElementById("search-tf");
const searchButton = document.querySelector(".search__btn");
const thumbNails = document.getElementById("thumbs");
const figure = document.getElementById("photo");
const conditionsDescribe = document.getElementById("conditions");
const creditUser = document.getElementById("credit-user");

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
  return await response.json(); // parse and return the JSON data
}

// async function fetches required value from weather data fetching
async function fetchWeatherData() {
  const weatherUrl = getWeatherUrl();

  try {
    const data = await fetchData(weatherUrl); // fetch the data and wait for it
    const weatherMain = data.weather[0].main; // access the 'main' value from the weather array
    console.log("weather currently: " + weatherMain); // log the weather main value
    return weatherMain.toLowerCase();
  } catch (error) {
    console.error("Error fetching weather data:", error); // handle any errors
    throw error; // re-throw the error for the caller to handle
  }
}

// function fils photos url
async function getPhotosUrl() {
  try {
    const inputValue = getInputValue();
    // const mainValue = await fetchWeatherData();
    const photosUrl = `https://api.unsplash.com/search/photos?query=${inputValue}&client_id=LazB1Bw0iVelhysK3r7TS2l2L-jrnpXWZsTv-x7H7tU`;

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
    console.log("look: ", data);

    data.results.forEach((photo) => {
      const thumbnailDiv = document.createElement("div");
      thumbnailDiv.classList.add("thumbnail"); // a new div element for each photo thumbnail

      const imgElement = document.createElement("img"); // an image element
      imgElement.src = photo.urls.thumb;
      imgElement.alt = `Photo by ${photo.user.name}`;

      // make thumbnail clickable and default figure img
      const thumbnailAnchor = document.createElement("a");

      thumbnailDiv.appendChild(imgElement);
      thumbnailAnchor.appendChild(thumbnailDiv);
      thumbNails.appendChild(thumbnailAnchor);

      thumbnailAnchor.addEventListener("click", async () => {
        const figureImg = document.createElement("img");
        figureImg.src = photo.urls.regular;
        figureImg.alt = `Photo by ${photo.user.name}`;
        figure.replaceChildren(figureImg);

        // editing info bar
        const mainValue = await fetchWeatherData();
        conditionsDescribe.innerText = mainValue;
        creditUser.innerText = photo.user.name;
        creditUser.href = photo.user.links.html;
        creditUser.target = "_blank";
      });
    });
  } catch (error) {
    console.error("Error fetching photos data:", error); // Handle errors
  }
}

document.getElementById("search").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default form submission behavior

  await fetchPhotosData();
});
