import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthContext";
import { FiUser, FiMail, FiLock, FiCheckCircle, FiX } from "react-icons/fi";

const Register = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setActiveUser, setToken, api } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await api.post("https://equine-excellence.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      if (data && data.token) {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        if (data.user) {
          setActiveUser(data.user);
        }
        navigate("/all-pets");
      } else {
        setMessage("Registration succeeded but session could not be established.");
        setShowMessage(true);
      }
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          "Registration unavailable. Please verify your connection."
      );
      setShowMessage(true);
    }
  };

  return (
    <Styles>
      <div className="register-container">
        <div className="register-card">
          <header className="register-header">
            <span className="registry-tag">New Membership</span>
            <h2>Join the Registry</h2>
            <p>Create an account to manage your elite equine portfolio.</p>
          </header>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="input-field">
              <FiUser className="icon" />
              <input
                type="text"
                required
                id="name"
                name="name"
                placeholder="Full Name / Stable Name"
                tabIndex={1}
              />
            </div>

            <div className="input-field">
              <FiMail className="icon" />
              <input
                type="email"
                required
                id="email"
                name="email"
                placeholder="Registry Email"
                tabIndex={2}
              />
            </div>

            <div className="input-field">
              <FiLock className="icon" />
              <input
                type="password"
                required
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="Secure Access Key (6+ chars)"
                tabIndex={3}
              />
            </div>

            <button type="submit" className="register-btn">Apply for Access</button>

            <div className="form-footer">
              <span>Already a member? </span>
              <Link to="/login">Login here</Link>
            </div>
          </form>
        </div>

        {showMessage && (
          <div className="modal-overlay">
            <div className="message-box">
              <div className="status-icon"><FiCheckCircle /></div>
              <h3>Registration Update</h3>
              <p>{message}</p>
              <button className="close-btn" onClick={() => setShowMessage(false)}>
                <FiX /> Acknowledge
              </button>
            </div>
          </div>
        )}
      </div>
    </Styles>
  );
};

export default Register;

const Styles = styled.div`
  .register-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fdfcf8;
    padding: 2rem;
  }

  .register-card {
    background: white;
    width: 100%;
    max-width: 500px;
    padding: 4rem;
    box-shadow: 0 20px 60px rgba(26, 46, 38, 0.08);
    border: 1px solid #f0efeb;
    border-radius: 4px;
  }

  .register-header {
    text-align: center;
    margin-bottom: 3rem;

    .registry-tag {
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 4px;
      font-size: 0.75rem;
      font-weight: 800;
      display: block;
      margin-bottom: 12px;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      color: #1a2e26;
      margin-bottom: 10px;
    }

    p {
      font-size: 0.95rem;
      color: #777;
      line-height: 1.5;
    }
  }

  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .input-field {
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      left: 15px;
      color: #c5a059;
      font-size: 1.1rem;
    }

    input {
      width: 100%;
      padding: 15px 15px 15px 45px;
      border: 1px solid #e0e0e0;
      background: #fafafa;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #c5a059;
        background: white;
        box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.1);
      }
    }
  }

  .register-btn {
    background: #1a2e26;
    color: white;
    padding: 18px;
    border: none;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 10px;

    &:hover {
      background: #c5a059;
      transform: translateY(-2px);
    }
  }

  .form-footer {
    text-align: center;
    font-size: 0.9rem;
    color: #777;

    a {
      color: #1a2e26;
      font-weight: 700;
      text-decoration: none;
      margin-left: 5px;
      &:hover { color: #c5a059; }
    }
  }

  /* Modal Styling */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(26, 46, 38, 0.9);
    backdrop-filter: blur(5px);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }

  .message-box {
    background: white;
    padding: 3rem;
    max-width: 400px;
    width: 90%;
    text-align: center;
    border-radius: 4px;

    .status-icon {
      font-size: 3rem;
      color: #c5a059;
      margin-bottom: 20px;
    }

    h3 {
      font-family: 'Playfair Display', serif;
      color: #1a2e26;
      margin-bottom: 12px;
    }

    p {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 30px;
      line-height: 1.6;
    }

    .close-btn {
      background: #1a2e26;
      color: white;
      border: none;
      padding: 12px 25px;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0 auto;
      text-transform: uppercase;
      letter-spacing: 1px;
      &:hover { background: #c5a059; }
    }
  }
`;