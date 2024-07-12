import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import News from "./pages/News";
import Discuss from "./pages/Discuss";
import Carobot from "./pages/Carobot";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route path="/news" Component={News} />
        <Route path="/discuss" Component={Discuss} />
        <Route path="/carobot" Component={Carobot} />
      </Routes>
    </div>
  );
};

export default App;
