import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Search from "./search/Search";
import History from "./history/History";

import { getCookie, setCookie } from "./utils/cookieUtils";

function App() {
  useEffect(() => {
    // Check if the user identifier cookie exists
    let userIdentifier = getCookie("userIdentifier");

    // If it doesn't exist, generate a new one and set it
    if (!userIdentifier) {
      userIdentifier = uuidv4();
      setCookie("userIdentifier", userIdentifier, 365); // Valid for 1 year
    }

    // Log the user identifier for demonstration purposes
    console.log("User Identifier:", userIdentifier);
  }, []);

  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
