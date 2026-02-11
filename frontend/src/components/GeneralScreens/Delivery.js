import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { 
  FiTruck, 
  FiShield, 
  FiCreditCard, 
  FiGlobe,
  FiAward,
  FiCheckCircle
} from "react-icons/fi";

// Asset Imports
import atlas1 from "../../Assets/atlas1.png";
import atlas2 from "../../Assets/atlas2.png";

export default function Delivery() {
  return (
    <DeliveryStyles>
      <header className="page-header">
        <span className="accent-label">Logistics & Acquisition</span>
        <h1>Equine Logistics</h1>
        <p className="subtitle">
          Whether you are adopting, purchasing, or receiving a gifted horse, 
          we ensure a seamless transition from our stables to your home.
        </p>
      </header>

      <Container>
        {/* Acquisition & Responsibility Section */}
        <section className="policy-block">
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="policy-text">
                <div className="icon-heading">
                  <FiAward />
                  <h2>Acquisition Model</h2>
                </div>
                <p>
                  At <strong>Equine Excellence</strong>, we facilitate three paths to horse ownership: 
                  Elite Sales, Legacy Adoptions, and Compassionate Rehoming (Free). 
                </p>
                <ul className="policy-list">
                  <li><strong>Responsibility:</strong> In all cases, the adopter or buyer is solely responsible for transportation and administrative costs.</li>
                  <li><strong>Documentation:</strong> Full veterinary records and transfer of ownership papers are provided once logistics are finalized.</li>
                  <li><strong>Integrity:</strong> We vet every home to ensure our horses continue to live in excellence.</li>
                </ul>
              </div>
            </Col>
            <Col lg={5}>
              <div className="image-frame main-frame">
                <img src={atlas1} alt="Atlas Crossings Logo" className="atlas-brand-img" />
              </div>
            </Col>
          </Row>
        </section>

        <hr className="divider" />

        {/* The Atlas Partnership Section */}
        <section className="atlas-partnership">
          <div className="section-title">
            <FiTruck />
            <span className="partner-tag">Exclusive Partner</span>
            <h2>Atlas Crossings</h2>
          </div>
          
          <Row className="align-items-center">
            <Col lg={6} className="order-2 order-lg-1">
              <div className="atlas-info">
                <h3>The Trusted Name in Equine Transport</h3>
                <p>
                  <strong>Atlas Crossings</strong> is the exclusive and only delivery agency authorized by Equine Excellence. 
                  Our long-standing partnership is built on a foundation of safety, 
                  unmatched care, and nationwide reliability.
                </p>
                <div className="feature-grid">
                  <div className="f-item">
                    <FiCheckCircle /> <span>Nationwide Delivery (USA)</span>
                  </div>
                  <div className="f-item">
                    <FiCheckCircle /> <span>Climate-Controlled Stalls</span>
                  </div>
                  <div className="f-item">
                    <FiCheckCircle /> <span>Industry-Leading Rates</span>
                  </div>
                  <div className="f-item">
                    <FiCheckCircle /> <span>Real-Time GPS Tracking</span>
                  </div>
                </div>
                <p className="atlas-cta">
                  By centralizing our logistics with Atlas Crossings, we guarantee the best possible 
                  transportation costs without compromising the welfare of the horse.
                </p>
              </div>
            </Col>
            <Col lg={6} className="order-1 order-lg-2">
              <div className="image-frame truck-frame">
                <img src={atlas2} alt="Atlas Crossings Transport" />
              </div>
            </Col>
          </Row>
        </section>

        {/* Payments Section */}
        <section className="payment-section">
          <div className="payment-container">
            <div className="payment-header">
              <FiCreditCard />
              <h2>Logistics & Service Fees</h2>
              <p>Fees range from <strong>$200 – $650</strong> covering nationwide transport, professional care, and documentation handling.</p>
            </div>
            
            <div className="payment-grid">
              <span>Zelle</span>
              <span>Apple Pay</span>
              <span>Chime</span>
              <span>Google Pay</span>
              <span>Certified Bank Draft</span>
            </div>
            
            <p className="secure-note">
              <FiShield /> SECURE CONCIERGE PAYMENTS • ATLAS CROSSINGS VERIFIED
            </p>
          </div>
        </section>
      </Container>
    </DeliveryStyles>
  );
}

const DeliveryStyles = styled.div`
  padding-bottom: 5rem;
  background-color: #fdfcf8;

  .page-header {
    background: #1a2e26;
    color: white;
    text-align: center;
    padding: 10rem 2rem 6rem;
    margin-bottom: 4rem;

    .accent-label {
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 4px;
      font-weight: 700;
      font-size: 0.9rem;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      margin: 1rem 0;
    }

    .subtitle {
      max-width: 650px;
      margin: 0 auto;
      opacity: 0.8;
      font-size: 1.1rem;
      line-height: 1.6;
    }
  }

  .image-frame {
    background: white;
    padding: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    border: 1px solid #eee;
    
    img {
      width: 100%;
      height: auto;
      display: block;
      object-fit: contain;
    }
  }

  .main-frame {
    border-radius: 50%; /* Optional: creates a badge feel for the logo */
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
  }

  .truck-frame {
    border-radius: 4px;
    margin-bottom: 2rem;
  }

  .policy-block {
    margin-bottom: 5rem;
    
    .icon-heading {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 1.5rem;
      color: #c5a059;
      svg { font-size: 2rem; }
      h2 { margin: 0; font-family: 'Playfair Display', serif; color: #1a2e26; }
    }

    .policy-text p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #444;
    }

    .policy-list {
      list-style: none;
      padding: 0;
      margin-top: 2rem;
      li {
        padding: 12px 0 12px 30px;
        position: relative;
        font-weight: 500;
        color: #1a2e26;
        border-bottom: 1px solid #f0f0f0;
        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: #c5a059;
          font-size: 1.5rem;
          line-height: 1;
        }
      }
    }
  }

  .atlas-partnership {
    padding: 4rem 0;

    .section-title {
      text-align: center;
      margin-bottom: 4rem;
      
      svg { font-size: 2.5rem; color: #c5a059; margin-bottom: 0.5rem; }
      .partner-tag {
        display: block;
        text-transform: uppercase;
        letter-spacing: 3px;
        font-weight: 800;
        font-size: 0.75rem;
        color: #c5a059;
      }
      h2 { font-family: 'Playfair Display', serif; font-size: 3rem; color: #1a2e26; }
    }

    .atlas-info {
      h3 { font-family: 'Playfair Display', serif; margin-bottom: 1.5rem; color: #1a2e26; }
      p { line-height: 1.8; color: #555; font-size: 1.05rem; }
      
      .feature-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin: 2rem 0;
        
        .f-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: #1a2e26;
          svg { color: #c5a059; }
        }
      }

      .atlas-cta {
        background: #f0efeb;
        padding: 1.5rem;
        border-left: 4px solid #c5a059;
        font-style: italic;
      }
    }
  }

  .payment-section {
    margin-top: 6rem;
    background: #1a2e26;
    color: white;
    padding: 5rem 2rem;
    border-radius: 4px;
    text-align: center;

    .payment-header {
      margin-bottom: 3rem;
      svg { font-size: 3rem; color: #c5a059; margin-bottom: 1.5rem; }
      h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; }
      p { opacity: 0.8; font-size: 1.1rem; max-width: 700px; margin: 10px auto; }
    }

    .payment-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      max-width: 900px;
      margin: 0 auto 3rem;

      span {
        background: rgba(255,255,255,0.05);
        padding: 12px 28px;
        border-radius: 2px;
        font-weight: 600;
        border: 1px solid rgba(255,255,255,0.1);
        font-size: 0.9rem;
      }
    }

    .secure-note {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: #c5a059;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 2px;
    }
  }

  @media (max-width: 991px) {
    .page-header h1 { font-size: 2.5rem; }
    .atlas-info .feature-grid { grid-template-columns: 1fr; }
  }
`;