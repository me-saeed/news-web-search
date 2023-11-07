export default function NewsCard({ news }) {
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
