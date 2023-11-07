import React, { useState, useEffect } from "react";

import NewsCard from "../components/NewsCard";
import { fetchNews } from "../services/newsService";
import { fetchPrefrenceNews } from "../services/prefrenceService";

import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function Home() {
  const navigate = useNavigate();
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [selectedSource, setSelectedSource] = useState("");

  const [newsData, setNewsData] = useState([]);
  const [sourceFilter, setSourceFilter] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [uniqueSources, setUniqueSources] = useState([]);

  const [categories, setCategories] = useState([]);

  const handleSearch = () => {
    if (keyword && selectedSource) {
      setShowEmptyMessage(false);

      fetchNews(selectedSource, keyword)
        .then((data) => {
          console.log(data);

          if (selectedSource == "newsApi") {
            setNewsData(data.articles);
            setCategories([
              "business",
              "entertainment",
              "general",
              "health",
              "science",
              "sports",
              "technology",
            ]);

            const authors = [
              ...new Set(data.articles.map((article) => article.author)),
            ];
            const categories = [
              ...new Set(data.articles.map((article) => article.category)),
            ];

            console.log(authors);

            // Filter out null or undefined values
            const sources = [
              ...new Set(
                data.articles.map((article) =>
                  article.source.name.substring(0, 12)
                )
              ),
            ];
            setUniqueSources(sources);
          } else if (selectedSource == "theguardian") {
            const transformedData = data.response.results.map((item) => ({
              source: {
                id: "theguardian",
                name: item.fields.byline,
              },
              author: item.fields.byline,
              title: item.webTitle,
              description: item.fields.bodyText.substring(0, 200),
              url: item.webUrl,
              urlToImage: item.fields.thumbnail,
              publishedAt: item.webPublicationDate,
              category: item.sectionName,
              content: "",
            }));

            setNewsData(transformedData);

            const sources = [
              ...new Set(
                transformedData.map((article) =>
                  article.source.name.substring(0, 12)
                )
              ),
            ];
            setUniqueSources(sources);

            const categories = [
              ...new Set(transformedData.map((article) => article.category)),
            ];
            setCategories(categories);
          } else if (selectedSource == "nytimes") {
            let all_data = data.response.docs;

            console.log(all_data);

            //// let image="https://static01.nyt.com/"+all_data[8].multimedia[0].url

            const transformedData = all_data.map((item) => ({
              source: {
                id: "nytimes",
                name: item.byline.original,
              },
              author: item.byline.original,
              title: item.headline.main,
              description: item.abstract,
              url: item.web_url,
              urlToImage:
                item.multimedia.length !== 0
                  ? "https://static01.nyt.com/" + item.multimedia[0].url
                  : "https://static01.nyt.com/images/2023/11/05/multimedia/04priyaliving-01-zftb/04priyaliving-01-zftb-articleLarge.jpg",

              publishedAt: item.pub_date,
              category: item.section_name,
              content: "",
            }));

            setNewsData(transformedData);

            const sources = [
              ...new Set(
                transformedData.map((article) =>
                  article.source.name.substring(0, 12)
                )
              ),
            ];
            setUniqueSources(sources);

            const categories = [
              ...new Set(transformedData.map((article) => article.category)),
            ];
            setCategories(categories);
          }
        })
        .catch((error) => console.error(error));
    } else {
      let allPreferredNews = [];
      const storedSource = localStorage.getItem("selectedSource");
      const storedCategory = localStorage.getItem("selectedCategory");

      const storedAuthor = localStorage.getItem("selectedAuthor");

      const sourcePromise = storedSource
        ? fetchPrefrenceNews("source", storedSource)
        : Promise.resolve({ articles: [] });

      const categoryPromise = storedCategory
        ? fetchPrefrenceNews("category", storedCategory)
        : Promise.resolve({ articles: [] });

      Promise.all([sourcePromise, categoryPromise])
        .then(([sourceData, categoryData]) => {
          allPreferredNews = [...sourceData.articles, ...categoryData.articles];
          console.log("------allPreferredNews-----", allPreferredNews);

          if (storedAuthor) {
            console.log(storedAuthor);

            const authorNameToMoveToTop = storedAuthor;

            const filteredArray = allPreferredNews.filter(
              (item) => item.author !== null
            );

            const sortedArray = filteredArray.sort((a, b) => {
              const authorA = a.author;
              const authorB = b.author;

              if (authorA === authorNameToMoveToTop) {
                return -1;
              } else if (authorB === authorNameToMoveToTop) {
                return 1;
              } else {
                return authorA.localeCompare(authorB, undefined, {
                  sensitivity: "base",
                });
              }
            });

            console.log("sortedArraysortedArraysortedArray", sortedArray);

            setNewsData(sortedArray);
          } else {
            setNewsData(allPreferredNews);
            if (allPreferredNews.length == 0) {
              setShowEmptyMessage(true);
            }
          }
        })
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
  const handleFilter = () => {
    const filteredData = newsData.filter((news) => {
      const matchesSource = !sourceFilter || news.source.name === sourceFilter;
      const matchesCategory =
        !selectedCategory || news.category === selectedCategory;
      const matchesDate =
        !selectedDate || news.publishedAt.includes(selectedDate);

      return matchesSource && matchesCategory && matchesDate;
    });

    setNewsData(filteredData);
  };

  return (
    <div>
      <Navbar />
      <div className="top-section">
        <div className="title">
          <h1>Search Your Desired News</h1>
        </div>
        <div className="search-bar">
          <div className="source-dropdown">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <option value="">Select API</option>
              <option value="newsApi">news API</option>
              <option value="theguardian">theguardian</option>
              <option value="nytimes">nytimes</option>
            </select>
          </div>
          <input
            type="text"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Enter a keyword"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="filters">
          <div className="filter">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              <option value="">All Sources</option>
              {uniqueSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div className="filter">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="filter">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleFilter}>Apply Filters</button>
      </div>

      {showEmptyMessage ? (
        <div className="empty-message">
          <p>
            No news articles found. Set your preferences by navigating to the
            settings page.
          </p>
        </div>
      ) : (
        <>
          {" "}
          <div className="news-card-section">
            {newsData.map((news, index) => (
              <NewsCard key={index} news={news} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
