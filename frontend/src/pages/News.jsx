// News.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer'; // Adjust the path as necessary

const News = () => {
  const [articles, setArticles] = useState([]);
  const API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=car&apiKey=${API_KEY}`);
        const validArticles = response.data.articles.filter(article => 
          article.title && 
          article.description && 
          article.url && 
          !article.url.includes('removed.com') &&
          !article.title.toLowerCase().includes('remove')
        );
        setArticles(validArticles);
      } catch (error) {
        console.error("Error fetching the news articles", error);
      }
    };

    fetchNews();
  }, [API_KEY]);

  return (
    <div className='bg-gray-700'>
    <div className="pt-20 px-6 ">
      <h1 className="text-3xl text-center font-bold mb-6 text-white">Latest News about Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="block">
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-700">{article.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      
    </div>
    <Footer />
    </div>
  );
};

export default News;
