import React from "react";
import "./WelcomePage.css";

const WelcomePage = ({ navigate }) => {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to PopX</h1>
        <p className="welcome-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>

        <div className="welcome-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("register")}
          >
            Create Account
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("login")}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
