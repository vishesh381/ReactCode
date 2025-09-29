import React, { useState } from "react";
import "./FormValidation.css";

export default function FormValidation() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!user.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(user.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!user.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(user.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!user.password) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (user.confirmPassword !== user.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("✅ Form submitted:", user);
      alert("Form submitted successfully!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Name:
        <input
          type="text"
          placeholder="Enter your name..."
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        {errors.name && <small className="error">{errors.name}</small>}
      </label>

      <label>
        Email:
        <input
          type="email"
          placeholder="Enter your email..."
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        {errors.email && <small className="error">{errors.email}</small>}
      </label>

      <label>
        Phone:
        <input
          type="tel"
          placeholder="Enter phone"
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />
        {errors.phone && <small className="error">{errors.phone}</small>}
      </label>

      <label>
        Password:
        <input
          type="password"
          placeholder="Enter password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {errors.password && <small className="error">{errors.password}</small>}
      </label>

      <label>
        Confirm Password:
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        />
        {errors.confirmPassword && (
          <small className="error">{errors.confirmPassword}</small>
        )}
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
