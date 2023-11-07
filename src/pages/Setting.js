import React, { useState, useEffect } from "react";

import "./UserSettings.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
function Setting() {
  const navigate = useNavigate();
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const availableSources = [
    "abc-news",
    "abc-news-au",
    "aftenposten",
    "al-jazeera-english",
    "ansa",
    "argaam",
    "ars-technica",
    "ary-news",
    "associated-press",
    "australian-financial-review",
    "axios",
    "bbc-news",
    "bbc-sport",
    "bild",
    "blasting-news-br",
    "bleacher-report",
    "bloomberg",
    "breitbart-news",
    "business-insider",
    "business-insider-uk",
    "buzzfeed",
    "cbc-news",
    "cbs-news",
    "cnn",
    "cnn-es",
    "crypto-coins-news",
    "der-tagesspiegel",
    "die-zeit",
    "el-mundo",
    "engadget",
    "entertainment-weekly",
    "espn",
    "espn-cric-info",
    "financial-post",
    "focus",
    "football-italia",
    "fortune",
    "four-four-two",
    "fox-news",
    "fox-sports",
    "globo",
    "google-news",
  ];

  const availableCategories = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];

  const availableAuthors = [
    "Stephen Clark",
    "Jigar Agrawal",
    "msmash",
    "Deanna Ritchie",
    "Quentyn Kennemer",
    "Radek Zielinski",
    "Maxwell William",
    "techkritiko@gmail.com (Jay Bonggolto)",
    "gglover@insider.com (George Glover)",
    "Kevin Lynch",
    "Brendan Griffiths",
    "Lakshmi Varanasi",
    "Amit Katwala",
    "Juan Carlos Figueroa",
    "Riley Hoffman",
    "Astha Rajvanshi",
    "tips@androidcentral.com (Nickolas Diaz)",
    "Quentyn Kennemer,Brendan Griffiths",
    "Christopher Woody",
    "AP",
    "The Associated Press",
    "Sudhi Ranjan Sen / Bloomberg",
    "Popkin",
    "tips@androidcentral.com (Vishnu Sarangapurkar)",
    "Bruce Schneier",
    "news@appleinsider.com (Peter Cohen)",
    "Hasan Chowdhury,Huileng Tan",
    "Kate BrandtChief Sustainability Officer, Google",
    "Filipe Espósito",
    "news@appleinsider.com (William Gallagher)",
    "John Tones",
    "Joe Rossignol",
    "Yasmeen Serhan",
    "Rubén Andrés",
    "nicholas.sutrich@futurenet.com (Nicholas Sutrich)",
    "Pratima Harigunani",
    "Vaibhav Vats",
    "Chelsea Harvey, E&E News",
    "Kanishka Singh and Costas Pitas",
    "Joseph Sgambati",
    "Simon Sharwood",
    "Juan Carlos López",
    "Kai Xiang Teo",
    "ted@byteddyk.com (Ted Kritsonis)",
    "Annesha Basu",
    "Ioanna Lykiardopoulou",
    "Kelly Beall",
    "Bárbara Bécares",
    "Bloomberg News",
    "Rahul Rao",
    "Andrew J. Hawkins",
    "Filip De Mott",
  ];

  useEffect(() => {
    const storedSource = localStorage.getItem("selectedSource");
    if (storedSource) {
      setSelectedSource(storedSource);
    }

    const storedCategory = localStorage.getItem("selectedCategory");
    if (storedCategory) {
      setSelectedCategory(storedCategory);
    }

    const storedAuthor = localStorage.getItem("selectedAuthor");
    if (storedAuthor) {
      setSelectedAuthor(storedAuthor);
    }
  }, []);

  const handleSave = () => {
    // Save selected values to local storage
    localStorage.setItem("selectedSource", selectedSource);
    localStorage.setItem("selectedCategory", selectedCategory);
    localStorage.setItem("selectedAuthor", selectedAuthor);

    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div className="user-settings">
        <h2>Save Your Preferences</h2>
        <div className="user-settings-form">
          <div className="user-setting">
            <label htmlFor="source">Select a Source:</label>
            <select
              id="source"
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
            >
              <option value="">All Sources</option>
              {availableSources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
          <div className="user-setting">
            <label htmlFor="category">Select a Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="user-setting">
            <label htmlFor="author">Select an Author:</label>
            <select
              id="author"
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
            >
              <option value="">All Authors</option>
              {availableAuthors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default Setting;
