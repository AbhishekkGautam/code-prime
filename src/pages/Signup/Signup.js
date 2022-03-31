import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import { useAuth } from "../../context/AuthContext";
import "./Signup.css";

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const {
    state: { error },
    signupHandler,
  } = useAuth();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const { firstName, lastName, email, password } = formData;

  const errorMsg =
    error === ""
      ? ""
      : error.status === 500
      ? "500 : Internal Server Error"
      : error.data.errors[0];

  const submitSignupFormData = () => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== ""
    ) {
      signupHandler(firstName, lastName, email, password);
    }
  };

  return (
    <main className="signup-wrapper">
      <Navbar />
      <section className="signup-section signup-container">
        <div className="card signup-card-container">
          <div className="card-title">Signup</div>
          {errorMsg !== "" ? (
            <div className="signup-error-message">{errorMsg}</div>
          ) : null}
          <div className="card-body">
            <form onSubmit={e => e.preventDefault()}>
              <div className="input-group">
                <label className="input-label">Email address</label>
                <input
                  type="email"
                  className="input-field"
                  required
                  placeholder="Email address"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={e =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input
                  type="text"
                  className="input-field"
                  required
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={e =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  required
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div
                className={`input-group ${
                  !isPasswordMatched ? "input-show-error" : null
                } `}
              >
                <label className="input-label">Confirm Password</label>
                <input
                  type="password"
                  className="input-field"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value);
                    setIsPasswordMatched(password === e.target.value);
                  }}
                />
                {!isPasswordMatched && (
                  <div className="error-message">Password doesn't match.</div>
                )}
              </div>
              <div className="card-extra-content">
                <div className="checkbox-group">
                  <label className="checkbox-label" htmlFor="checkbox1">
                    <input
                      className="checkbox"
                      id="checkbox1"
                      type="checkbox"
                      name="checkbox"
                    />
                    I accept all Terms & Conditions
                  </label>
                </div>
              </div>
              <button
                className="btn btn-primary signup-btn"
                onClick={submitSignupFormData}
              >
                Create New Account
              </button>
            </form>
            <div className="create-new-account-link">
              <Link to="/login">
                Already have an account
                <span className="material-icons">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
