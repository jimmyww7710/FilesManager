import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page/Home';
import Details from './page/Details';

const App = () => {
  return (
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Details" element={<Details />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
