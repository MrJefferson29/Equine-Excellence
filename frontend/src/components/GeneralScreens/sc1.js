import React from "react";
import styled from "styled-components";
import daisy from "../../Assets/gira.jpg";
import Ads from "./Ads";
import Sc2 from "./Sc2";
import { useNavigate } from "react-router-dom";

export default function Sc1() {
  const navigate = useNavigate();

  return (
    <Styles>
      <section className="hero-section">
        <div className="overlay" />
        
        <div className="hero-container">
          <div className="content-card">
            <div className="top-accent" />
            
            <div className="badge-wrapper">
              <span className="gold-dot" />
              <span className="badge-text">Premier Equine Bloodlines</span>
            </div>

            <h1 className="hero-title">
              Legacy, Grace & <br /> 
              <span className="highlight">Athletic Excellence</span>
            </h1>

            <div className="divider" />

            <p className="hero-subtitle">
              Equine Excellence connects discerning riders with 
              responsible breeders and world-class equine athletes.
            </p>

            <p className="hero-description">
              From competitive jumping prospects to gentle trail companions, 
              find a horse that doesn't just meet standards—but defines them. 
              Your journey to the winner's circle starts here.
            </p>

            <div className="button-group">
              <button className="primary-btn" onClick={() => navigate("/all-pets")}>
                View Sales List
              </button>
              <button className="secondary-btn" onClick={() => navigate("/about")}>
                Our Heritage
              </button>
            </div>
          </div>
        </div>
      </section>

      <Ads />
      <Sc2 />
    </Styles>
  );
}

const Styles = styled.div`
  /* Theme Colors */
  --primary: #1a2e26;
  --accent: #c5a059;
  --white: #ffffff;

  .hero-section {
    position: relative;
    background-image: url(${daisy});
    background-size: cover;
    background-position: center;
    min-height: 90vh; /* Increased height for more drama */
    display: flex;
    align-items: center;
    padding: 2rem;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(26, 46, 38, 0.8) 0%,
      rgba(26, 46, 38, 0.2) 100%
    );
  }

  .hero-container {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  .content-card {
    max-width: 650px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    padding: 3.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px; /* Sharp, premium edges */
    color: var(--white);
    position: relative;
    overflow: hidden;
  }

  .top-accent {
    position: absolute;
    top: 0;
    left: 0;
    height: 4px;
    width: 100px;
    background: var(--accent);
  }

  .badge-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1.5rem;
  }

  .gold-dot {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
  }

  .badge-text {
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent);
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    line-height: 1.1;
    margin-bottom: 1.5rem;
    font-weight: 400;

    .highlight {
      font-style: italic;
      color: var(--accent);
    }
  }

  .divider {
    width: 50px;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
    margin-bottom: 1.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 500;
  }

  .hero-description {
    font-size: 1rem;
    line-height: 1.8;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 2.5rem;
  }

  .button-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .primary-btn {
    background: var(--accent);
    color: var(--primary);
    border: none;
    padding: 1.2rem 2.5rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: var(--white);
      transform: translateY(-3px);
    }
  }

  .secondary-btn {
    background: transparent;
    color: var(--white);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 1.2rem 2.5rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--white);
    }
  }

  @media (max-width: 768px) {
    .hero-section {
      padding: 1rem;
      justify-content: center;
      text-align: center;
    }

    .content-card {
      padding: 2.5rem 1.5rem;
    }

    .badge-wrapper {
      justify-content: center;
    }

    .divider {
      margin: 1.5rem auto;
    }

    .button-group {
      justify-content: center;
    }
  }
`;