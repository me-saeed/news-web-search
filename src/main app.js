import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {


  const apiKey = 'de1d714cb7884ca18ef97891b68416b7';
  const [keyword, setKeyword] = useState('');
  const [selectedDate, setSelectedDate] = useState('');


  const [selectedSource, setSelectedSource] = useState('');

  const [newsData, setNewsData] = useState([]);
  const [sourceFilter, setSourceFilter] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');

  const [uniqueSources, setUniqueSources] = useState([]);


  const [categories, setCategories] = useState([]);

  // const categories = [];


  const handleSearch = () => {
    // if (keyword === '') {
    //   alert('Please enter a keyword.');
    //   return;
    // }

    // Construct the API URL based on user input

    if(keyword){



      if (selectedSource=="news API"){

      console.log(selectedDate)
    let apiUrl = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;
    if (selectedDate) {
      apiUrl += `&from=${selectedDate}`;
    }

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        
        console.log(data)
        setNewsData(data.articles)
        setCategories(['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'])
      
      
        const authors = [...new Set(data.articles.map((article) => article.author))];
        const categories = [...new Set(data.articles.map((article) => article.category))];

        // Filter out null or undefined values
        const sources = [...new Set(data.articles.map((article) => article.source.name))];
        setUniqueSources(sources);
      })

   

      .catch((error) => console.error(error));
    }
  }
  if (selectedSource=="theguardian"){

    const apiKey = '70d3dc2a-94e8-4578-98a2-f6beb974a115'; // Replace with your actual API key
const baseUrl = 'https://content.guardianapis.com/search';



const fromDate = '2010-01-01'; // Replace with your desired from date

// Define additional parameters for your request
const parameters = {
  'q': keyword,
  'format': 'json',
  // 'tag': category,
  // 'from-date': fromDate,
  'show-tags': 'all',
  'show-fields': 'all',
  'show-refinements': 'all',
  'order-by': 'relevance',
  'api-key': apiKey,
};

// Construct the URL with parameters
const url = new URL(baseUrl);
Object.keys(parameters).forEach((key) => url.searchParams.append(key, parameters[key]));

// Now you can fetch data from this URL
fetch(url.toString())
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data here
    console.log(data);


    const transformedData = data.response.results.map((item) => ({
      source: {
        id: 'theguardian',
        name: item.fields.byline,
      },
      author: item.fields.byline, // You can customize this based on the available data
      title: item.webTitle,
      description: item.fields.bodyText.substring(0,200), // Add description here if available
      url: item.webUrl,
      urlToImage: item.fields.thumbnail,
      publishedAt: item.webPublicationDate,
      category: item.sectionName,
      content: '', // Add content here if available
    }));
    
    // Now you have 'transformedData' in the desired format
    // You can set it using setNewsData
    setNewsData(transformedData);

    const sources = [...new Set(transformedData.map((article) => article.source.name))];
    setUniqueSources(sources);


    const categories = [...new Set(transformedData.map((article) => article.category))];
    setCategories(categories)

  })
  .catch((error) => console.error(error));


  }

  else if (selectedSource=="nytimes"){

    const apiKey = 'v4vdNKnV3oAhj3VtG40BXAW3jrHWNPMB'; // Replace with your actual API key
    const baseUrl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const queryParams = {
      'api-key': apiKey,
      'q': keyword, // Replace with your query
      // 'begin_date': '20230101', // Replace with your begin_date
      // 'end_date': '20231104', // Replace with your end_date
      'sort': 'newest', // Replace with your desired sort order
      // Add more query parameters as needed
    };

    const url = new URL(baseUrl);
    Object.keys(queryParams).forEach((key) => {
      url.searchParams.append(key, queryParams[key]);
    });

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
      let all_data=data.response.docs

      console.log(all_data )

     //// let image="https://static01.nyt.com/"+all_data[8].multimedia[0].url


        const transformedData = all_data.map((item) => ({
          source: {
            id: 'nytimes',
            name: item.byline.original,
          },
          author: item.byline.original, // You can customize this based on the available data
          title: item.headline.main,
          description: item.abstract, // Add description here if available
          url: item.web_url,
         urlToImage:  item.multimedia.length!==0? "https://static01.nyt.com/"+item.multimedia[0].url:"https://static01.nyt.com/images/2023/11/05/multimedia/04priyaliving-01-zftb/04priyaliving-01-zftb-articleLarge.jpg" ,
        
         ///urlToImage:image,
         publishedAt: item.pub_date,
          category: item.section_name,
          content: '', // Add content here if available
        }));
        
        // Now you have 'transformedData' in the desired format
        // You can set it using setNewsData
        setNewsData(transformedData);

        const sources = [...new Set(transformedData.map((article) => article.source.name))];
        setUniqueSources(sources);
    
    
        const categories = [...new Set(transformedData.map((article) => article.category))];
        setCategories(categories)


        // You can now work with the data returned from the API
      })
      .catch((err) => {
        console.error(err);
      });
  }

  };

  // Use useEffect to automatically fetch data when the date or keyword changes
  useEffect(() => {

    
    handleSearch();
  }, []);
  const handleFilter = () => {
    // Filter the news data based on the selected source, category, and date
    const filteredData = newsData.filter((news) => {
      const matchesSource = !sourceFilter || news.source.name === sourceFilter;
      const matchesCategory = !selectedCategory || news.category === selectedCategory;
      const matchesDate = !selectedDate || news.publishedAt.includes(selectedDate);

      return matchesSource && matchesCategory && matchesDate;
    });

    // Update the newsData state with the filtered data
    setNewsData(filteredData);
  };

  const dummyNews = [
    {
      source: {
        
        id: 'wired',
        name: 'Wired',
      },
      author: 'Matt Burgess',
      title: 'This Cheap Hacking Device Can Crash Your iPhone With Pop-Ups',
      description:
        'Plus: SolarWinds is charged with fraud, New Orleans police face recognition has flaws, and new details about Okta’s October data breach emerge.',
      url: 'https://www.wired.com/story/flipper-zero-iphone-dos-attack-security-roundup/',
      urlToImage:
        'https://media.wired.com/photos/65450b438e91e3ca88ad9cbb/191:100/w_1280,c_limit/Flipper-Zero-Security-Roundup.jpg',
      publishedAt: '2023-11-04T13:00:00Z',
      content:
        'As the Israel-Hamas war continues, with Israeli troops moving into the Gaza Strip and encircling Gaza City, one piece of technology is having an outsized impact on how we see and understand the war...',
    },

    

    {
      source: {
        id: 'wired',
        name: 'Wired',
      },
      author: 'Matt Burgess',
      title: 'This Cheap Hacking Device Can Crash Your iPhone With Pop-Ups',
      description:
        'Plus: SolarWinds is charged with fraud, New Orleans police face recognition has flaws, and new details about Okta’s October data breach emerge.',
      url: 'https://www.wired.com/story/flipper-zero-iphone-dos-attack-security-roundup/',
      urlToImage:
        'https://media.wired.com/photos/65450b438e91e3ca88ad9cbb/191:100/w_1280,c_limit/Flipper-Zero-Security-Roundup.jpg',
      publishedAt: '2023-11-04T13:00:00Z',
      content:
        'As the Israel-Hamas war continues, with Israeli troops moving into the Gaza Strip and encircling Gaza City, one piece of technology is having an outsized impact on how we see and understand the war...',
    },

    {
      source: {
        id: 'wired',
        name: 'Wired',
      },
      author: 'Matt Burgess',
      title: 'This Cheap Hacking Device Can Crash Your iPhone With Pop-Ups',
      description:
        'Plus: SolarWinds is charged with fraud, New Orleans police face recognition has flaws, and new details about Okta’s October data breach emerge.',
      url: 'https://www.wired.com/story/flipper-zero-iphone-dos-attack-security-roundup/',
      urlToImage:
        'https://media.wired.com/photos/65450b438e91e3ca88ad9cbb/191:100/w_1280,c_limit/Flipper-Zero-Security-Roundup.jpg',
      publishedAt: '2023-11-04T13:00:00Z',
      content:
        'As the Israel-Hamas war continues, with Israeli troops moving into the Gaza Strip and encircling Gaza City, one piece of technology is having an outsized impact on how we see and understand the war...',
    },


    {
      source: {
        id: 'wired',
        name: 'Wired',
      },
      author: 'Matt Burgess',
      title: 'This Cheap Hacking Device Can Crash Your iPhone With Pop-Ups',
      description:
        'Plus: SolarWinds is charged with fraud, New Orleans police face recognition has flaws, and new details about Okta’s October data breach emerge.',
      url: 'https://www.wired.com/story/flipper-zero-iphone-dos-attack-security-roundup/',
      urlToImage:
        'https://media.wired.com/photos/65450b438e91e3ca88ad9cbb/191:100/w_1280,c_limit/Flipper-Zero-Security-Roundup.jpg',
      publishedAt: '2023-11-04T13:00:00Z',
      content:
        'As the Israel-Hamas war continues, with Israeli troops moving into the Gaza Strip and encircling Gaza City, one piece of technology is having an outsized impact on how we see and understand the war...',
    },

    {
      source: {
        id: 'wired',
        name: 'Wired',
      },
      author: 'Matt Burgess',
      title: 'This Cheap Hacking Device Can Crash Your iPhone With Pop-Ups',
      description:
        'Plus: SolarWinds is charged with fraud, New Orleans police face recognition has flaws, and new details about Okta’s October data breach emerge.',
      url: 'https://www.wired.com/story/flipper-zero-iphone-dos-attack-security-roundup/',
      urlToImage:
        'https://media.wired.com/photos/65450b438e91e3ca88ad9cbb/191:100/w_1280,c_limit/Flipper-Zero-Security-Roundup.jpg',
      publishedAt: '2023-11-04T13:00:00Z',
      content:
        'As the Israel-Hamas war continues, with Israeli troops moving into the Gaza Strip and encircling Gaza City, one piece of technology is having an outsized impact on how we see and understand the war...',
    },
  ];


  function NewsCard({ news }) {
    return (
      <div className="news-card">
        <img src={news.urlToImage} alt="News Thumbnail" />
        <div className="card-content">
          <h2>{news.title}</h2>
          <p>{news.description}</p>
          <p>Author: {news.author}</p>
          <p>Published at: {new Date(news.publishedAt).toDateString()}</p>
          <a href={news.url} target="_blank" rel="noopener noreferrer">
            Read More
          </a>
        </div>
      </div>
    );
  }

  return (

    <div>
  <div className="top-section">
  <nav className="navbar">
    <div className="logo">
      <img src="your-logo.png" alt="Logo" /> {/* Replace with your logo */}
    </div>
    <div className="user-settings">
      {/* Add user settings icons or buttons here */}
    </div>
  </nav>
  <div className="title">
    <h1>Search Your Desired News</h1>
  </div>
  <div className="search-bar">
    <div className="source-dropdown">
    <select value={sourceFilter} onChange={(e) => setSelectedSource(e.target.value)}>
        <option value="">Select API</option>
        <option value="news API">news API</option>
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
      <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
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
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
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

    <div className="news-card-section">
      {newsData.map((news, index) => (
        <NewsCard key={index} news={news} />
      ))}
    </div>
</div>
  );
}

export default App;
