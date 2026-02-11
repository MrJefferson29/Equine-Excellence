import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { 
  FiTruck, 
  FiFileText, 
  FiShield, 
  FiCreditCard, 
  FiMapPin, 
  FiHeart 
} from "react-icons/fi";

export default function Delivery() {
  return (
    <DeliveryStyles>
      <header className="page-header">
        <span className="accent-label">Our Mission</span>
        <h1>Payments & Delivery</h1>
        <p className="subtitle">
          Dedicated to connecting quality horses with responsible adopters.
        </p>
      </header>

      <Container>
        {/* Policy Section */}
        <section className="policy-block">
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="policy-text">
                <div className="icon-heading">
                  <FiHeart />
                  <h2>Adoption Policy</h2>
                </div>
                <p>
                  <strong>Purr Quality Horses</strong> is a compassionate rehoming platform. 
                  We believe every animal deserves dignity and a second chance. 
                  Therefore, <strong>horses are adopted, not sold.</strong>
                </p>
                <ul className="policy-list">
                  <li>No purchase price is charged for the animal itself.</li>
                  <li>Adopters are only responsible for transportation and administrative costs.</li>
                  <li>Valid legal documentation is required prior to transfer.</li>
                  <li>Ensures transparency and legal protection for both parties.</li>
                </ul>
              </div>
            </Col>
            <Col lg={6}>
              <div className="legal-notice-box">
                <FiShield className="shield-icon" />
                <h3>Legal Transparency</h3>
                <p>
                  Once transport costs are covered and paperwork is verified, 
                  the horse is officially released to the adopter. This process 
                  guarantees animal safety and responsible ownership.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        <hr className="divider" />

        {/* Transport Options */}
        <section className="transport-section">
          <div className="section-title">
            <FiTruck />
            <h2>Transport & Delivery Options</h2>
          </div>
          <Row>
            {[
              {
                title: "Professional Equine Transport",
                desc: "Licensed transporters specializing in long-distance safety and comfort.",
                icon: <FiMapPin />
              },
              {
                title: "Local Animal Services",
                desc: "Trusted local providers for nearby adoptions and quick transitions.",
                icon: <FiTruck />
              },
              {
                title: "Adopter Pickup",
                desc: "Personally collect your horse after legal documentation is complete.",
                icon: <FiFileText />
              },
              {
                title: "Coordinated Transport",
                desc: "Shared transport arrangements to reduce stress and costs for multiple adoptions.",
                icon: <FiShield />
              }
            ].map((item, i) => (
              <Col md={6} lg={3} key={i}>
                <div className="transport-card">
                  <div className="t-icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </section>

        {/* Payments Section */}
        <section className="payment-section">
          <div className="payment-container">
            <div className="payment-header">
              <FiCreditCard />
              <h2>Accepted Payment Methods</h2>
              <p>Fees range from <strong>$200 – $650</strong> (Transport, care, and administrative only).</p>
            </div>
            
            <div className="payment-grid">
              <span>Zelle</span>
              <span>Cash App</span>
              <span>Apple Pay</span>
              <span>Chime</span>
              <span>PayPal</span>
              <span>Google Pay</span>
              <span>Gift Cards</span>
            </div>
            
            <p className="secure-note">
              <FiShield /> All transactions are handled securely and transparently.
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
      max-width: 600px;
      margin: 0 auto;
      opacity: 0.8;
      font-size: 1.1rem;
    }
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
        padding: 10px 0 10px 30px;
        position: relative;
        font-weight: 500;
        color: #1a2e26;
        &::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #c5a059;
          font-weight: 900;
        }
      }
    }
  }

  .legal-notice-box {
    background: white;
    border-left: 5px solid #c5a059;
    padding: 3rem;
    box-shadow: 0 15px 40px rgba(0,0,0,0.05);
    text-align: center;

    .shield-icon {
      font-size: 3rem;
      color: #c5a059;
      margin-bottom: 1.5rem;
    }

    h3 { font-family: 'Playfair Display', serif; margin-bottom: 1rem; }
    p { color: #666; font-size: 0.95rem; line-height: 1.7; }
  }

  .divider {
    margin: 4rem 0;
    border-color: #eee;
  }

  .transport-section {
    .section-title {
      text-align: center;
      margin-bottom: 3rem;
      color: #1a2e26;
      svg { font-size: 2.5rem; color: #c5a059; margin-bottom: 1rem; display: block; margin-inline: auto; }
      h2 { font-family: 'Playfair Display', serif; font-size: 2.2rem; }
    }

    .transport-card {
      text-align: center;
      padding: 2rem;
      background: white;
      border: 1px solid #f0f0f0;
      height: 100%;
      transition: 0.3s;

      &:hover { border-color: #c5a059; transform: translateY(-5px); }

      .t-icon {
        font-size: 2rem;
        color: #c5a059;
        margin-bottom: 1rem;
      }

      h4 { font-size: 1.1rem; color: #1a2e26; font-weight: 700; margin-bottom: 1rem; }
      p { font-size: 0.9rem; color: #777; line-height: 1.6; }
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
      p { opacity: 0.8; font-size: 1.1rem; }
    }

    .payment-grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      max-width: 800px;
      margin: 0 auto 3rem;

      span {
        background: rgba(255,255,255,0.1);
        padding: 10px 25px;
        border-radius: 50px;
        font-weight: 600;
        border: 1px solid rgba(255,255,255,0.1);
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
      letter-spacing: 1px;
    }
  }

  @media (max-width: 991px) {
    .page-header h1 { font-size: 2.5rem; }
    .policy-block { text-align: center; }
    .legal-notice-box { margin-top: 2rem; }
  }
`;