import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TEST_IDS } from './constants';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import Signup from './pages/Signup';
import Success from './pages/Success';

function App() {
  return (
    <Router>
      <div className="App" data-testid={TEST_IDS.appDiv}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
