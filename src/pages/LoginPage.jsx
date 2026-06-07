import React, { useState } from "react";
import "./LoginPage.css";

const LoginPage = ({ navigate, onLogin, users }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const matchedUser = users.find(
      (u) =>
        u.email.toLowerCase() === formData.email.toLowerCase() &&
        u.password === formData.password
    );

    if (!matchedUser) {
      setServerError("Invalid email or password. Please try again.");
      return;
    }

    onLogin(matchedUser);
    navigate("account");
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="login-title">
          Signin to your
          <br />
          PopX account
        </h1>
        <p className="login-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
      </div>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        {serverError && <p className="server-error">{serverError}</p>}

        <div className={`form-group ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className={`form-group ${errors.password ? "has-error" : ""}`}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="btn-login">
          Login
        </button>
      </form>

      <button className="back-link" onClick={() => navigate("welcome")}>
        ← Back
      </button>
    </div>
  );
};

export default LoginPage;
