import { apiKeys } from "../config/apikeys";

export function fetchNews(source, keyword, isCategory) {
  let apiUrl;
  if (source === "newsApi") {
    apiUrl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKeys.newsApi}`;
  } else if (source === "theguardian") {
    const baseUrl = "https://content.guardianapis.com/search";
    const parameters = {
      q: keyword,
      format: "json",

      "api-key": apiKeys.theguardian,

      "show-tags": "all",
      "show-fields": "all",
      "show-refinements": "all",
      "order-by": "relevance",
    };
    // Construct the URL and make the request
    apiUrl = constructUrl(baseUrl, parameters);
  } else if (source === "nytimes") {
    const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const queryParams = {
      "api-key": apiKeys.nytimes,
      q: keyword,
      // Add NY Times-specific parameters here
    };
    // Construct the URL and make the request
    apiUrl = constructUrl(baseUrl, queryParams);
  }

  console.log("jhsj", apiUrl);
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

function constructUrl(baseUrl, parameters) {
  const url = new URL(baseUrl);
  Object.keys(parameters).forEach((key) =>
    url.searchParams.append(key, parameters[key])
  );
  return url.toString();
}
