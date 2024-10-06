import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="container text-center">
      <h1>Welcome to Team Roster Management</h1>
      <Link to="/roster" className="btn btn-primary mt-3">
        Manage Roster
      </Link>
    </div>
  );
};

export default Home;
