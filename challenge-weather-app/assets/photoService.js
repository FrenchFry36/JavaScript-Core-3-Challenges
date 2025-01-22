const apiKeyUnsplash = "LazB1Bw0iVelhysK3r7TS2l2L-jrnpXWZsTv-x7H7tU"; // Unsplash API key

export async function fetchPhoto(city, weatherCondition) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${city} ${weatherCondition}&client_id=${apiKeyUnsplash}&per_page=1`
  );
  const data = await response.json();

  return data.results.length > 0 ? data.results[0].urls.full : null;
}
