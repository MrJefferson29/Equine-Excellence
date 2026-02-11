import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import Navbar from './Navbar';
import { AuthContext } from "../../Context/AuthContext";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const { activeUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleResize = () => {
    setIsMobile(window.innerWidth < 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <HeaderStyles>
      <div className="nav-container">
        {/* Logo Section */}
        <Link to='/' className="brand-block">
          <img src={logo} alt="Equine Excellence" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name">Equine</span>
            <span className="brand-sub">Excellence</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="desktop-links">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/about">Our Story</Link>
            <Link className="nav-link" to="/all-pets">The Collection</Link>
            <Link className="nav-link" to="/delivery-options">Delivery</Link>
            <Link className="nav-link" to="/contact-us">Contact</Link>
            
            {activeUser && (
              <div className="admin-actions">
                <button 
                  className="admin-btn" 
                  onClick={() => navigate("/upload-horse")}
                >
                  Register Horse
                </button>
                <button 
                  className="logout-btn" 
                  onClick={() => { logout(); navigate("/"); }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile Toggle (Hamburger) */}
        {isMobile && <Navbar />}
      </div>
    </HeaderStyles>
  );
}

const HeaderStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  height: 80px; /* Increased height for premium feel */
  display: flex;
  align-items: center;

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 30px;
  }

  .brand-block {
    display: flex;
    align-items: center;
    text-decoration: none;
    gap: 12px;
  }

  .brand-logo {
    height: 50px;
    width: auto;
    object-fit: contain;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    line-height: 1;
  }

  .brand-name {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a2e26;
    letter-spacing: 1px;
  }

  .brand-sub {
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 4px;
    color: #c5a059;
    font-weight: 700;
    margin-top: 2px;
  }

  .desktop-links {
    display: flex;
    gap: 35px;
    align-items: center;

    .nav-link {
      font-size: 0.9rem;
      font-weight: 600;
      color: #1a2e26;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      position: relative;
      padding: 5px 0;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: #c5a059;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }

  .admin-actions {
    display: flex;
    gap: 15px;
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #ddd;
  }

  .admin-btn {
    background: #1a2e26;
    color: white;
    border: none;
    padding: 8px 18px;
    border-radius: 2px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s;
    &:hover { background: #c5a059; }
  }

  .logout-btn {
    background: transparent;
    border: 1px solid #ff4d4d;
    color: #ff4d4d;
    padding: 8px 18px;
    border-radius: 2px;
    font-size: 0.8rem;
    cursor: pointer;
    &:hover { background: #ff4d4d; color: white; }
  }

  @media (max-width: 1024px) {
    height: 65px;
    .brand-name { font-size: 1.1rem; }
    .brand-logo { height: 40px; }
  }
`;