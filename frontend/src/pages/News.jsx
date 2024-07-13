import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import { FaNewspaper, FaSpinner } from 'react-icons/fa';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;
  const ARTICLES_PER_PAGE = 9;

  const fetchNews = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything`, {
        params: {
          q: 'car',
          apiKey: API_KEY,
          page: page,
          pageSize: ARTICLES_PER_PAGE
        }
      });
      const validArticles = response.data.articles.filter(article =>
        article.title &&
        article.description &&
        article.url &&
        !article.url.includes('removed.com') &&
        !article.title.toLowerCase().includes('remove')
      );
      if (validArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles(prevArticles => [...prevArticles, ...validArticles]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching the news articles", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className='bg-gray-900 min-h-screen'>
      <div className="pt-24 px-6 container mx-auto">
        <h1 className="text-4xl text-center font-bold mb-10 text-white flex items-center justify-center">
          <FaNewspaper className="mr-4" />
          Latest News about Cars
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                {article.urlToImage && (
                  <img src={article.urlToImage} alt={article.title} className="w-full h-48 object-cover" />
                )}
                <div className="p-6 flex flex-col justify-between h-64">
                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-white">{article.title}</h2>
                    <p className="text-gray-400 mb-4">{article.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={fetchNews}
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </>
              ) : (
                'Load More News'
              )}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default News;