import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Forecast from './Forecast.jsx'
import History from './History.jsx'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Forecast />} />
          <Route path="/hist" element={<History />} />


       
        </Routes>
      </div>
    </Router>
  );
}

export default App;
