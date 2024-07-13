import React, { useState, useEffect } from "react";
import axios from "axios";
import bannerImage from "../assets/banner-YIlsm1GEG-transformed.jpeg";
import discussImage from "../assets/discuss.png";
import newImage from "../assets/car news.png";
import botImage from "../assets/carobot.png";

const Body = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const accessKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
      try {
        const response = await axios.get(
          "https://api.unsplash.com/search/photos",
          {
            params: { query: "cars", per_page: 10 },
            headers: {
              Authorization: `Client-ID ${accessKey}`,
            },
          }
        );
        setImages(response.data.results);
      } catch (error) {
        console.error("Error fetching images from Unsplash:", error);
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
    <div className="flex flex-col items-center py-[200px] text-white bg-gray-900">
      <div className="flex flex-col md:flex-row w-full max-w-7xl px-4 md:px-8">
        {/* Left Container */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-4 mb-8 md:mb-0">
          <div className="min-w-fit min-h-fit flex items-center justify-center">
            <p className="font-mono text-lg md:text-2xl text-center md:text-left">
              Welcome to Car Enthusiast Haven! This website is dedicated to all
              things cars, featuring a stunning collection of car images,
              detailed reviews, and the latest news. Whether you're a car
              enthusiast or a lover of sleek, powerful machines, you'll find
              everything you need to fuel your passion for automobiles.
            </p>
          </div>
        </div>

        {/* Right Container */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center space-y-4">
          {images.length > 0 ? (
            <div className="w-full max-w-md h-64 md:h-80 overflow-hidden rounded-xl border-4 border-gray-600 shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl">
              <img
                src={images[currentImageIndex].urls.small}
                alt={images[currentImageIndex].alt_description}
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out"
                key={images[currentImageIndex].id}
              />
            </div>
          ) : (
            <div className="w-full max-w-md h-64 md:h-80 border-2 border-gray-600 flex items-center justify-center">
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* Banner Image */}
      <div
        id="banner"
        className="relative mt-16 w-full h-48 md:h-64 flex justify-center items-center hover:brightness-75"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 blur-2xl"></div>
        <h1 className="relative text-white text-4xl md:text-6xl lg:text-8xl z-10 items-center font-cool text-center">
          It's About Cars
        </h1>
      </div>

      <div className="flex flex-col p-5 max-w-7xl w-full">
        <h1 className="text-center text-4xl md:text-6xl mt-10 mb-10">Features</h1>
        
        {/* Feature Sections */}
        {[
          { id: "Discuss", title: "Discuss", image: discussImage, description: "The Discuss feature allows users to engage in conversations about cars. Users can create profiles, participate in forums or comment sections, and share their thoughts, ask questions, and provide answers." },
          { id: "News", title: "News", image: newImage, description: "The News section keeps users updated with the latest car industry news, trends, and updates. Stay informed about new car releases, automotive technology advancements, and market insights." },
          { id: "carobot", title: "Carobot", image: botImage, description: "The Carobot feature offers an interactive chatbot that helps users find information about cars, get maintenance tips, and even troubleshoot issues. It's your personal car assistant available 24/7." }
        ].map((feature, index) => (
          <div
            key={feature.id}
            id={feature.id}
            className={`flex flex-col md:flex-row border-4 border-gray-800 rounded-2xl bg-[#131313] mx-2 md:mx-10 items-center justify-evenly hover:border-blue-500 hover:shadow-lg transition duration-300 ${index > 0 ? 'mt-10' : ''}`}
          >
            <div className="flex flex-col w-full md:w-[60%] p-5">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{feature.title}</h2>
              <p className="text-lg md:text-xl">
                {feature.description}
              </p>
            </div>
            <div className="flex flex-col w-full md:w-auto p-5">
              <img
                src={feature.image}
                alt={`${feature.title} feature`}
                className="w-full md:w-[300px] h-auto md:h-[280px] object-contain transform transition duration-300 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;