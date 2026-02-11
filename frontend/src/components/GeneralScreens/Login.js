import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AuthContext } from "../../Context/AuthContext";
import { FiLock, FiMail, FiAlertCircle, FiX } from "react-icons/fi";

const Login = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setActiveUser, setToken, api } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const { data } = await api.post('/auth/login', { email, password });

      if (data && data.token) {
        localStorage.setItem("authToken", data.token);
        setToken(data.token);
        if (data.user) {
          setActiveUser(data.user);
        }
        navigate('/all-pets');
      } else {
        setShowMessage(true);
        setErrorMessage("Access denied. Please verify your credentials.");
      }
    } catch (error) {
      setShowMessage(true);
      setErrorMessage(
        error?.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <Styles>
      <div className="login-container">
        <div className="login-card">
          <header className="login-header">
            <span className="registry-tag">Official Registry</span>
            <h2>Member Access</h2>
            <p>Welcome to the Equine Excellence Private Collection.</p>
          </header>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-field">
              <FiMail className="icon" />
              <input
                type="email"
                required
                id="email"
                name="email"
                placeholder="Registry Email"
                tabIndex={1}
              />
            </div>

            <div className="input-field">
              <FiLock className="icon" />
              <input
                type="password"
                required
                id="password"
                name="password"
                placeholder="Access Key"
                tabIndex={2}
              />
            </div>

            <div className="form-utils">
              <Link to="/forgotpassword">Forgot Access Key?</Link>
              <Link to="/register" className="signup-link">Apply for Registry</Link>
            </div>

            <button type="submit" className="login-btn">Secure Login</button>
          </form>
        </div>

        {showMessage && (
          <div className="modal-overlay">
            <div className="message-box">
              <FiAlertCircle className="err-icon" />
              <h3>Authentication Error</h3>
              <p>{errorMessage}</p>
              <button className="close-btn" onClick={() => setShowMessage(false)}>
                <FiX /> Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </Styles>
  );
};

export default Login;

const Styles = styled.div`
  .login-container {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fdfcf8; /* Light parchment color */
    padding: 20px;
  }

  .login-card {
    background: white;
    width: 100%;
    max-width: 450px;
    padding: 3.5rem;
    box-shadow: 0 20px 60px rgba(26, 46, 38, 0.1);
    border: 1px solid #f0efeb;
    border-radius: 4px;
    text-align: center;
  }

  .login-header {
    margin-bottom: 2.5rem;

    .registry-tag {
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 4px;
      font-size: 0.7rem;
      font-weight: 800;
      display: block;
      margin-bottom: 10px;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      color: #1a2e26;
      margin-bottom: 8px;
    }

    p {
      font-size: 0.9rem;
      color: #777;
    }
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .input-field {
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      left: 15px;
      color: #c5a059;
    }

    input {
      width: 100%;
      padding: 14px 14px 14px 45px;
      border: 1px solid #e0e0e0;
      background: #fafafa;
      font-size: 0.95rem;
      transition: all 0.3s ease;

      &:focus {
        outline: none;
        border-color: #c5a059;
        background: white;
      }
    }
  }

  .form-utils {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin: 5px 0;

    a {
      color: #777;
      text-decoration: none;
      &:hover { color: #c5a059; }
    }

    .signup-link {
      color: #1a2e26;
      font-weight: 700;
    }
  }

  .login-btn {
    background: #1a2e26;
    color: white;
    padding: 16px;
    border: none;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 10px;

    &:hover {
      background: #c5a059;
      transform: translateY(-2px);
    }
  }

  /* Modal Enhancements */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(26, 46, 38, 0.85); /* Deep green overlay */
    backdrop-filter: blur(4px);
    display: flex; justify-content: center; align-items: center;
    z-index: 1000;
  }

  .message-box {
    background: white;
    padding: 40px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    border-radius: 4px;

    .err-icon {
      font-size: 3rem;
      color: #d9534f;
      margin-bottom: 20px;
    }

    h3 {
      font-family: 'Playfair Display', serif;
      color: #1a2e26;
      margin-bottom: 10px;
    }

    p {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 25px;
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
      gap: 8px;
      margin: 0 auto;
      &:hover { background: #c5a059; }
    }
  }
`;