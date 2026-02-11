import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Facebook, Twitter, Instagram } from "react-bootstrap-icons";

function Footer() {
  return (
    <FooterContainer>
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <FooterSection>
              <FooterLogo>
                EQUINE<span>EXCELLENCE</span>
              </FooterLogo>
              <FooterDescription>
                Dedicated to the ethical rehoming and heritage preservation of 
                elite equine companions. From majestic stallions to gentle 
                companions, we bridge the gap between legacy and new beginnings.
              </FooterDescription>
            </FooterSection>
          </Col>
          
          <Col md={4} className="ps-md-5">
            <FooterSection>
              <FooterTitle>The Registry</FooterTitle>
              <FooterLink href="/all-pets">The Collection</FooterLink>
              <FooterLink href="/about">Our Heritage</FooterLink>
              <FooterLink href="/delivery-options">Logistics & Transport</FooterLink>
              <FooterLink href="/contact-us">Inquiry Desk</FooterLink>
            </FooterSection>
          </Col>
          
          <Col md={4}>
            <FooterSection>
              <FooterTitle>Connect</FooterTitle>
              <SocialIcons>
                <SocialIcon href="#" aria-label="Facebook">
                  <Facebook size={20} />
                </SocialIcon>
                <SocialIcon href="#" aria-label="Twitter">
                  <Twitter size={20} />
                </SocialIcon>
                <SocialIcon href="#" aria-label="Instagram">
                  <Instagram size={20} />
                </SocialIcon>
              </SocialIcons>
              <ContactDetails>
                <p>Dalhart, Texas | Equestrian District</p>
                {/* <p className="phone">+1 571-549-3014</p> */}
                <p className="email">equineexcellence.help@gmail.com
                </p>
              </ContactDetails>
            </FooterSection>
          </Col>
        </Row>
      </Container>
      <FooterBottom>
        <p>&copy; 2026 Equine Excellence Registry. All rights reserved.</p>
        <p className="legal-tag">Ethical Standards • Heritage Preservation • Integrity</p>
      </FooterBottom>
    </FooterContainer>
  );
}

export default Footer;

// --- Styled Components ---

const FooterContainer = styled.footer`
  background-color: #1a2e26; /* Deep Paddock Green */
  color: #f8f9fa;
  padding: 4rem 0 0 0;
  border-top: 1px solid rgba(197, 160, 89, 0.2);
`;

const FooterSection = styled.div`
  margin-bottom: 2rem;
`;

const FooterLogo = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  color: white;

  span {
    display: block;
    font-size: 0.7rem;
    color: #c5a059; /* Gold */
    letter-spacing: 5px;
    font-weight: 300;
    margin-top: 4px;
  }
`;

const FooterDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.7);
  max-width: 320px;
`;

const FooterTitle = styled.h3`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 700;
  color: #c5a059;
  margin-bottom: 1.5rem;
`;

const FooterLink = styled.a`
  display: block;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  &:hover {
    color: #c5a059;
    padding-left: 5px;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
`;

const SocialIcon = styled.a`
  color: #f8f9fa;
  background: rgba(255, 255, 255, 0.05);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: #c5a059;
    color: #1a2e26;
    transform: translateY(-3px);
  }
`;

const ContactDetails = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  
  p { margin-bottom: 5px; }
  .phone, .email {
    color: white;
    font-weight: 600;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  background-color: #14241e; /* Darker shade of the green */
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  p {
    margin: 0;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 1px;
  }

  .legal-tag {
    margin-top: 8px;
    text-transform: uppercase;
    font-size: 0.6rem;
    letter-spacing: 3px;
    color: #c5a059;
    opacity: 0.6;
  }
`;