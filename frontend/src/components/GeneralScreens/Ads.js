import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';

export default function Ads() {
  const navigate = useNavigate();
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const { data } = await axios.get('https://equine-excellence.onrender.com/api/horses', {
          params: { limit: 6 },
        });
        setHorses(data);
      } catch (error) {
        console.error("Error loading recommended horses", error);
        setHorses([]);
      }
    };
    fetchRecommended();
  }, []);

  const handleCardClick = (formattedName) => {
    navigate(`/pet/${formattedName}`);
  };

  return (
    <Styles>
      <Container>
        <div className="section-header">
          <span className="subtitle">Curated Selection</span>
          <h3>Available Equines</h3>
          <div className="accent-line" />
        </div>

        <Row className="g-4">
          {horses.map((horse, index) => {
            const formattedName = horse.name.replace(/\s+/g, '-').toLowerCase();
            return (
              <Col key={index} xs={12} sm={6} lg={4}>
                <div
                  className="horse-card"
                  onClick={() => handleCardClick(formattedName)}
                >
                  <div className="image-container">
                    <img src={horse.images[0]} alt={horse.name} />
                    <div className="hover-overlay">
                      <span>View Details</span>
                    </div>
                  </div>
                  
                  <div className="horse-info">
                    <h4 className="horse-name">{horse.name}</h4>
                    <div className="price-tag">{horse.price}</div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>

        <div className="footer-action">
          <button
            onClick={() => navigate('/all-pets')}
            className="premium-outline-btn"
          >
            Explore Full Collection
          </button>
        </div>
      </Container>
    </Styles>
  );
}

const Styles = styled.section`
  padding: 5rem 0;
  background-color: #fdfcf8; /* Creamy light background */

  .section-header {
    text-align: center;
    margin-bottom: 4rem;

    .subtitle {
      text-transform: uppercase;
      letter-spacing: 4px;
      font-size: 0.8rem;
      color: #c5a059;
      font-weight: 600;
      display: block;
      margin-bottom: 0.5rem;
    }

    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: #1a2e26;
      margin: 0;
    }

    .accent-line {
      width: 60px;
      height: 2px;
      background: #c5a059;
      margin: 1.5rem auto;
    }
  }

  .horse-card {
    background: white;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    position: relative;
    border: 1px solid #eee;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.08);

      img {
        transform: scale(1.05);
      }

      .hover-overlay {
        opacity: 1;
      }
    }
  }

  .image-container {
    height: 300px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
  }

  .hover-overlay {
    position: absolute;
    inset: 0;
    background: rgba(26, 46, 38, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;

    span {
      color: white;
      border: 1px solid white;
      padding: 10px 20px;
      text-transform: uppercase;
      font-size: 0.8rem;
      letter-spacing: 2px;
    }
  }

  .horse-info {
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .horse-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      color: #1a2e26;
      margin: 0;
    }

    .price-tag {
      font-weight: 700;
      color: #c5a059;
      font-size: 1.1rem;
    }
  }

  .footer-action {
    margin-top: 4rem;
    text-align: center;
  }

  .premium-outline-btn {
    background: transparent;
    border: 1px solid #1a2e26;
    color: #1a2e26;
    padding: 1rem 3rem;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 2px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      background: #1a2e26;
      color: white;
    }
  }

  @media (max-width: 768px) {
    padding: 3rem 0;
    
    .section-header h3 {
      font-size: 2rem;
    }

    .image-container {
      height: 250px;
    }
  }
`;