import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

import SocialAuth from "./pages/social-auth/SocialAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/google" element={<SocialAuth />} />
      </Routes>
    </Router>
  );
};

export default App;
