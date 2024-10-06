import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Roster = React.lazy(() => import("./pages/Roster.tsx"));

const App: React.FC = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Roster />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
