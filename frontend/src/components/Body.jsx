import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Body = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const accessKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
      try {
        const response = await axios.get('https://api.unsplash.com/search/photos', {
          params: { query: 'cars', per_page: 10 }, // Fetch 10 images for demonstration
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        });
        setImages(response.data.results);
      } catch (error) {
        console.error('Error fetching images from Unsplash:', error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [images]);

  return (
    <div className="flex py-20 text-white">
      {/* Left Container */}
      <div className="w-1/2 flex flex-col items-center justify-center space-y-4 pl-10 pt-24">
        <div className="min-w-fit min-h-fit flex items-center justify-center">
          <p className='font-mono text-[30px]'>
            Welcome to Car Enthusiast Haven! This website is dedicated to all things cars, featuring a stunning collection of car images, detailed reviews, and the latest news. Whether you're a car enthusiast or a lover of sleek, powerful machines, you'll find everything you need to fuel your passion for automobiles.
          </p>
        </div>
      </div>

      {/* Right Container */}
      <div className="w-1/2 flex flex-col items-center justify-center space-y-4 pl-10 pt-24">
        {images.length > 0 ? (
          <div className="w-[400px] h-[350px] overflow-hidden rounded-xl border-4 border-gray-600 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
            <img
              src={images[currentImageIndex].urls.small}
              alt={images[currentImageIndex].alt_description}
              className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
              key={images[currentImageIndex].id}
            />
          </div>
        ) : (
          <div className="w-[200px] h-[200px] border-2 border-black flex items-center justify-center">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Body;
