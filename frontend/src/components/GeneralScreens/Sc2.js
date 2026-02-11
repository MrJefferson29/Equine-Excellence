import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Container } from "react-bootstrap";
import { FiMail } from "react-icons/fi";
import TestimonialSlider from "./Testimonies";
import verifies from "../../Assets/verifies.jpg";
import big1 from "../../Assets/big1.jpg";
import big2 from "../../Assets/big2.jpg";
import { useNavigate } from "react-router-dom";

export default function Sc2() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (email.trim() === "") {
      alert("Please enter your email address.");
    } else {
      alert(`Welcome to the stable 🐎, ${email}!`);
      setEmail("");
    }
  };

  return (
    <Styles>
      {/* Editorial Content Section */}
      <Container className="content-container">
        <Row className="editorial-row align-items-center">
          <Col lg={6} className="image-column">
            <div className="editorial-img-wrapper">
              <img src={big1} alt="Horse care" />
              <div className="img-frame" />
            </div>
          </Col>
          <Col lg={6} className="text-column">
            <div className="editorial-content">
              <span className="pre-title">The Foundation</span>
              <h2>Safety & Bonding: Raising Horses Around Children</h2>
              <p>
                A well-mannered horse is the ultimate companion for a growing child. 
                We believe that the bond starts with respect. Teaching the next 
                generation how to approach, groom, and communicate with these 
                majestic animals builds life-long empathy and discipline.
              </p>
              <button className="text-link-btn" onClick={() => navigate("/about")}>Read the Equestrian Guide →</button>
            </div>
          </Col>
        </Row>

        <Row className="editorial-row align-items-center reverse-mobile">
          <Col lg={6} className="text-column order-2 order-lg-1">
            <div className="editorial-content">
              <span className="pre-title">Expert Knowledge</span>
              <h2>Vitality & Longevity: Breed-Specific Health Care</h2>
              <p>
                From the respiratory needs of a Thoroughbred to the metabolic 
                profiles of a Warmblood, understanding your horse's unique 
                genetic blueprint is the key to a long, competitive life. 
                Explore our curated health insights for every breed type.
              </p>
              <button className="text-link-btn" onClick={() => navigate("/about")}>Explore Health Research →</button>
            </div>
          </Col>
          <Col lg={6} className="image-column order-1 order-lg-2">
            <div className="editorial-img-wrapper alt-frame">
              <img src={big2} alt="Horse health" />
              <div className="img-frame" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Premium Newsletter Section */}
      <div className="newsletter-section">
        <Container>
          <div className="newsletter-box">
            <div className="icon-badge">
              <FiMail />
            </div>
            <h3>Join The Inner Circle</h3>
            <p>
              Receive exclusive alerts on champion bloodlines, 
              private sales, and professional training masterclasses.
            </p>

            <div className="form-wrapper">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubmit}>Request Access</button>
            </div>

            <div className="options-group">
              <label className="custom-checkbox">
                <input type="checkbox" defaultChecked />
                <span>Market Updates</span>
              </label>
              <label className="custom-checkbox">
                <input type="checkbox" defaultChecked />
                <span>Care Guides</span>
              </label>
            </div>
          </div>
        </Container>
      </div>

      {/* Testimonials */}
      <div className="testimonials-wrapper">
        <Container>
          <div className="section-title">
            <span className="accent-label">Shared Experiences</span>
            <h2>Testimonials</h2>
          </div>
          <TestimonialSlider />
        </Container>
      </div>

      <div className="full-width-banner">
        <img src={verifies} alt="Certified Quality" />
      </div>
    </Styles>
  );
}

const Styles = styled.div`
  background-color: #fdfcf8;
  padding-bottom: 4rem;

  /* Editorial Sections */
  .content-container {
    padding: 6rem 15px;
  }

  .editorial-row {
    margin-bottom: 8rem;
  }

  .editorial-img-wrapper {
    position: relative;
    padding: 20px;
    
    img {
      width: 100%;
      height: 500px;
      object-fit: cover;
      position: relative;
      z-index: 2;
      border-radius: 2px;
    }

    .img-frame {
      position: absolute;
      top: 0;
      right: 40px;
      bottom: 40px;
      left: 0;
      border: 1px solid #c5a059;
      z-index: 1;
    }
  }

  .alt-frame .img-frame {
    right: 0;
    left: 40px;
  }

  .editorial-content {
    padding: 0 3rem;

    .pre-title {
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-size: 0.85rem;
      font-weight: 700;
      display: block;
      margin-bottom: 1rem;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.8rem;
      color: #1a2e26;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    p {
      color: #555;
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }

    .text-link-btn {
      background: none;
      border: none;
      color: #1a2e26;
      font-weight: 700;
      border-bottom: 2px solid #c5a059;
      padding: 0 0 5px 0;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: #c5a059;
        letter-spacing: 1px;
      }
    }
  }

  /* Newsletter Section */
  .newsletter-section {
    background: #1a2e26;
    padding: 6rem 0;
    color: white;
    text-align: center;
  }

  .newsletter-box {
    max-width: 800px;
    margin: 0 auto;

    .icon-badge {
      color: #c5a059;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    p {
      opacity: 0.7;
      margin-bottom: 2.5rem;
      font-size: 1.1rem;
    }
  }

  .form-wrapper {
    display: flex;
    max-width: 500px;
    margin: 0 auto 2rem;
    gap: 10px;

    input {
      flex: 1;
      padding: 1rem 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      outline: none;

      &:focus {
        border-color: #c5a059;
      }
    }

    button {
      background: #c5a059;
      color: #1a2e26;
      border: none;
      padding: 0 2rem;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 1px;
      cursor: pointer;
    }
  }

  .options-group {
    display: flex;
    justify-content: center;
    gap: 30px;
    
    .custom-checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      opacity: 0.8;
      cursor: pointer;

      input { accent-color: #c5a059; }
    }
  }

  /* Testimonials Area */
  .testimonials-wrapper {
    padding: 6rem 0;
    
    .section-title {
      text-align: center;
      margin-bottom: 4rem;

      .accent-label {
        color: #c5a059;
        text-transform: uppercase;
        letter-spacing: 4px;
        font-weight: 600;
      }

      h2 {
        font-family: 'Playfair Display', serif;
        font-size: 3rem;
        color: #1a2e26;
      }
    }
  }

  .full-width-banner {
    width: 100%;
    height: 300px;
    overflow: hidden;
    margin-top: 4rem;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 991px) {
    .editorial-content { padding: 2rem 0; }
    .editorial-img-wrapper img { height: 350px; }
    .form-wrapper { flex-direction: column; }
    .form-wrapper button { padding: 1rem; }
  }
`;