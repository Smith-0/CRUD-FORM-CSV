import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = React.lazy(() => import("./pages/Home.tsx"));
const Roster = React.lazy(() => import("./pages/Roster.tsx"));

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roster" element={<Roster />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
