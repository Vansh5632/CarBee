import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="w-full bg-[#131313] text-white py-10 mt-20">
        <div className="container flex flex-col md:flex-row justify-between px-10">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold mb-2">Car Enthusiast Haven</h2>
            <p className="text-sm">
              Dedicated to all things cars, featuring a stunning collection of car images, detailed reviews, and the latest news.
            </p>
          </div>
          <div className="md:w-1/3 mt-4 md:mt-0">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul>
              <li><a href="#Discuss" className="hover:underline">Discuss</a></li>
              <li><a href="#News" className="hover:underline">News</a></li>
              <li><a href="#carobot" className="hover:underline">Carobot</a></li>
            </ul>
          </div>
          <div className="md:w-1/3 mt-4 md:mt-0">
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p>Email: contact@carenthusiasthaven.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="container mx-auto text-center mt-10 text-sm">
          <p>&copy; 2024 Car Enthusiast Haven. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
