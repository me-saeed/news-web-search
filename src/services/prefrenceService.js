import { apiKeys } from "../config/apikeys";

export function fetchPrefrenceNews(storedSourceOrCategory, value) {
  let apiUrl;

  if (storedSourceOrCategory == "source")
    apiUrl = `https://newsapi.org/v2/top-headlines?sources=${value}&apiKey=${apiKeys.newsApi}`;
  else {
    apiUrl = `https://newsapi.org/v2/top-headlines?category=${value}&apiKey=${apiKeys.newsApi}`;
  }

  console.log("jhsj", apiUrl);
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
