import React from "react";
import styled from "styled-components";

// Asset placeholders - replace with your horse-related images
import HorseHero from "../../Assets/wils1.jpg"; 
import HorseRanch from "../../Assets/wils2.jpg";
import HorseTraining from "../../Assets/wils3.jpg";

const Theme = {
  primary: "#1a2e26", // Deep Paddock Green
  accent: "#c5a059",  // Champagne Gold
  text: "#2c2c2c",
  light: "#fdfcf8",   // Creamy Parchment
  shadow: "rgba(0, 0, 0, 0.1)"
};

const Container = styled.div`
  font-family: 'Playfair Display', serif; /* Suggest adding this to your index.html */
  background-color: ${Theme.light};
  color: ${Theme.text};
  overflow-x: hidden;
`;

const HeroSection = styled.header`
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${HorseHero});
  background-size: cover;
  background-position: center;
  text-align: center;
  margin-bottom: 4rem;

  h1 {
    font-size: clamp(2.5rem, 8vw, 5rem);
    letter-spacing: 4px;
    text-transform: uppercase;
    margin: 0;
  }

  p {
    font-size: 1.2rem;
    font-family: 'Inter', sans-serif;
    letter-spacing: 2px;
  }
`;

const Wrapper = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const EditorialSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 8rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1.2fr;
    direction: ${props => (props.reverse ? "rtl" : "ltr")};
  }
`;

const TextBlock = styled.div`
  direction: ltr; /* Reset direction for text */
  
  h2 {
    font-size: 3rem;
    color: ${Theme.primary};
    margin-bottom: 1.5rem;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background: ${Theme.accent};
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    font-family: 'Inter', sans-serif;
    color: #555;
  }
`;

const ImageCard = styled.div`
  position: relative;
  box-shadow: 20px 20px 0px ${Theme.accent};
  transition: transform 0.4s ease;

  &:hover {
    transform: translate(-5px, -5px);
  }

  img {
    width: 100%;
    display: block;
    height: 500px;
    object-fit: cover;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 4rem 0;
`;

const ValueItem = styled.div`
  background: white;
  padding: 3rem 2rem;
  border: 1px solid #eee;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${Theme.accent};
    transform: translateY(-10px);
  }

  h3 {
    color: ${Theme.accent};
    text-transform: uppercase;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const CTA = styled.div`
  background: ${Theme.primary};
  color: white;
  padding: 5rem 2rem;
  text-align: center;
  margin-top: 4rem;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  button {
    background: ${Theme.accent};
    color: white;
    border: none;
    padding: 15px 40px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    margin-top: 20px;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const Footer = styled.footer`
  padding: 3rem;
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #888;
`;

const About = () => {

  const handleInquire= () => {
    const CONTACT_EMAIL = 'equineexcellence.help@gmail.com';
    const body = [
      'REGISTRY INQUIRY - Equine Excellence',
      'Dear EE team, I have the following inquiries to make',
      'Message:',
    ].join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Registry Inquiry - Equine Excellence')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <Container>
      <HeroSection>
        <div>
          <h1>Equine Excellence</h1>
          <p>ESTABLISHED 2014 • EXCELLENCE IN EQUESTRIAN BLOODLINES</p>
        </div>
      </HeroSection>

      <Wrapper>
        <EditorialSection>
          <TextBlock>
            <h2>Our Heritage</h2>
            <p>
              Located in the heart of prime pastoral lands, Equine Excellence 
              is dedicated to the breeding and training of world-class equine athletes. 
              Our journey began over a decade ago with a single vision: to bridge 
              the gap between champion bloodlines and the perfect rider connection.
            </p>
            <p>
              We specialize in horses with impeccable temperaments, athletic 
              prowess, and the intelligence required for top-tier competition 
              and lifelong companionship.
            </p>
          </TextBlock>
          <ImageCard>
            <img src={HorseRanch} alt="Our Ranch" />
          </ImageCard>
        </EditorialSection>

        <EditorialSection reverse>
          <TextBlock>
            <h2>The Selection Process</h2>
            <p>
              Acquiring a horse is a life-changing decision. Unlike standard 
              sales barns, we operate on a selective placement basis. Every 
              prospective owner undergoes a consultation to ensure that the 
              horse's energy and skill level align perfectly with the rider’s goals.
            </p>
            <p>
              Our horses are raised with daily human interaction, professional 
              groundwork, and a nutritional program designed for peak physical 
              development.
            </p>
          </TextBlock>
          <ImageCard>
            <img src={HorseTraining} alt="Training Session" />
          </ImageCard>
        </EditorialSection>

        <ValuesGrid>
          <ValueItem>
            <h3>Integrity</h3>
            <p>Full medical histories and genetic testing provided for every horse in our care.</p>
          </ValueItem>
          <ValueItem>
            <h3>Socialization</h3>
            <p>From trail exposure to arena noise, our horses are prepared for any environment.</p>
          </ValueItem>
          <ValueItem>
            <h3>Legacy</h3>
            <p>We offer lifelong support and guidance to our buyers to ensure a thriving partnership.</p>
          </ValueItem>
        </ValuesGrid>
      </Wrapper>
      <CTA>
        <h2>Find Your Next Champion</h2>
        <p>Private viewings are available by appointment at our estate.</p>
        <button onClick={handleInquire}>Inquire Today</button>
      </CTA>

      <Footer>
        <p>&copy; 2026 Equine Excellence. Handcrafted Equestrian Excellence.</p>
      </Footer>
    </Container>
  );
};

export default About;