import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Discuss from "./pages/Discuss";
import Carobot from "./pages/Carobot";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignUpPage from "./components/SignUpPage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleOpenSignUp = () => {
    setIsSignUpOpen(true);
    setIsLoginOpen(false); // Close login modal when opening sign-up modal
  };

  const handleCloseSignUp = () => {
    setIsSignUpOpen(false);
  };

  return (
    <AuthProvider>
      <div>
        <Navbar
          onSignInClick={handleOpenLogin}
          onSignUpClick={handleOpenSignUp}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={handleCloseLogin}
          onSignUpClick={handleOpenSignUp}
        />
        <SignUpPage isOpen={isSignUpOpen} onClose={handleCloseSignUp} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/discuss" element={<Discuss />} />
          <Route path="/carobot" element={<Carobot />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
