import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = ({ navigate, onRegister }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    companyName: "",
    isAgency: "yes",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = {
      ...formData,
      photo: null,
    };

    onRegister(newUser);
    navigate("account");
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <h1 className="register-title">
          Create your
          <br />
          PopX account
        </h1>
      </div>

      <form className="register-form" onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${errors.fullName ? "has-error" : ""}`}>
          <label htmlFor="fullName">Full Name<span className="red-star">*</span></label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            placeholder="Marry Doe"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && (
            <span className="field-error">{errors.fullName}</span>
          )}
        </div>

        <div className={`form-group ${errors.phone ? "has-error" : ""}`}>
          <label htmlFor="phone">Phone number<span className="red-star">*</span></label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Marry Doe"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <span className="field-error">{errors.phone}</span>
          )}
        </div>

        <div className={`form-group ${errors.email ? "has-error" : ""}`}>
          <label htmlFor="email">Email address<span className="red-star">*</span></label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Marry Doe"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
        </div>

        <div className={`form-group ${errors.password ? "has-error" : ""}`}>
          <label htmlFor="password">Password<span className="red-star">*</span></label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Marry Doe"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="companyName">Company name</label>
          <input
            id="companyName"
            type="text"
            name="companyName"
            placeholder="Marry Doe"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group radio-group">
          <label className="radio-question">Are you an Agency?<span className="red-star">*</span></label>
          <div className="radio-options">
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                value="yes"
                checked={formData.isAgency === "yes"}
                onChange={handleChange}
              />
              <span className="radio-custom" />
              Yes
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="isAgency"
                value="no"
                checked={formData.isAgency === "no"}
                onChange={handleChange}
              />
              <span className="radio-custom" />
              No
            </label>
          </div>
        </div>

        <button type="submit" className="btn-register">
          Create Account
        </button>
      </form>

      <button className="back-link" onClick={() => navigate("welcome")}>
        ← Back
      </button>
    </div>
  );
};

export default RegisterPage;
