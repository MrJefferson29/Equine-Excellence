import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { 
  FiMail, 
  FiHeart, 
  FiArrowLeft, 
  FiEdit3, 
  FiX, 
  FiChevronLeft, 
  FiChevronRight 
} from "react-icons/fi";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  fade: true 
};

export default function HorseDetails() {
  const [like, setLike] = useState(false);
  const [horse, setHorse] = useState(null);
  const [relatedHorses, setRelatedHorses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null); // Track which image is full-screen

  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { name } = useParams();

  // Fetch Horse Details
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await axios.get(`https://equine-excellence.onrender.com/api/horses/${name}`);
        setHorse(data);

        const allRes = await axios.get("https://equine-excellence.onrender.com/api/horses");
        const all = allRes.data || [];
        const related = all.filter(
          (h) => h.category === data.category && h.name !== data.name
        );
        setRelatedHorses(related.slice(0, 4));
      } catch (err) {
        console.error("Error loading horse details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [name]);

  // Handle Keyboard Navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, horse]);

  const nextImage = () => {
    if (!horse) return;
    setLightboxIndex((prev) => (prev + 1) % horse.images.length);
  };

  const prevImage = () => {
    if (!horse) return;
    setLightboxIndex((prev) => (prev - 1 + horse.images.length) % horse.images.length);
  };

  const getSaleTypeLabel = (saleType) => {
    switch (saleType) {
      case "free": return "Free";
      case "adoption": return "For Adoption";
      case "for_sale": default: return "For Sale";
    }
  };

  const handleEmailClick = () => {
    const email = "equineexcellence.help@gmail.com";
    const subject = `Inquiry: ${horse.name}`;
    const body = `I am interested in learning more about ${horse.name}. Please provide pedigree details and viewing availability.`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) return <LoadingState>Preparing Digital Pedigree...</LoadingState>;
  if (!horse) return <NotFound><FiArrowLeft /> Horse not found. <Link to="/all-pets">Browse Gallery</Link></NotFound>;

  return (
    <DetailsStyles>
      {/* --- FULL SCREEN LIGHTBOX --- */}
      {lightboxIndex !== null && (
        <LightboxOverlay onClick={() => setLightboxIndex(null)}>
          <button className="close-btn" onClick={() => setLightboxIndex(null)}><FiX /></button>
          
          <button className="nav-btn left" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FiChevronLeft />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={horse.images[lightboxIndex]} alt={`${horse.name} full view`} />
            <div className="counter">{lightboxIndex + 1} / {horse.images.length}</div>
          </div>

          <button className="nav-btn right" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <FiChevronRight />
          </button>
        </LightboxOverlay>
      )}

      <div className="breadcrumb">
        <Link to="/all-pets"><FiArrowLeft /> Back to Collection</Link>
      </div>

      <div className="main-layout">
        {/* Left: Gallery */}
        <div className="gallery-section">
          <Slider {...sliderSettings}>
            {horse.images.map((img, i) => (
              <div key={i} className="slide" onClick={() => setLightboxIndex(i)}>
                <img src={img} alt={horse.name} />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right: Info */}
        <div className="content-section">
          <div className="header-flex">
            <div>
              <span className="category-label">{horse.category}</span>
              <h1 className="horse-name">{horse.name}</h1>
            </div>
            <div className="price-tag">{horse.price}</div>
          </div>

          <p className="description">{horse.description}</p>

          <div className="specs-grid">
            <div className="spec-tile"><label>Sex</label><span>{horse.sex}</span></div>
            <div className="spec-tile"><label>Age</label><span>{horse.age}</span></div>
            <div className="spec-tile"><label>Sale Type</label><span>{getSaleTypeLabel(horse.saleType)}</span></div>
            <div className="spec-tile"><label>Status</label><span>Available</span></div>
          </div>

          <div className="action-buttons">
            <button className="msg-btn" onClick={handleEmailClick}>
              <FiMail /> Inquire via Email
            </button>
            <button className={`like-btn ${like ? 'active' : ''}`} onClick={() => setLike(!like)}>
              <FiHeart fill={like ? "#c5a059" : "none"} />
            </button>
          </div>

          {activeUser && (
            <button className="admin-edit-btn" onClick={() => navigate(`/pet/${name}/edit`)}>
              <FiEdit3 /> Edit Record
            </button>
          )}
        </div>
      </div>

      {/* Related Listings */}
      {relatedHorses.length > 0 && (
        <RelatedSection>
          <h3>Related Listings</h3>
          <div className="related-grid">
            {relatedHorses.map((h, i) => (
              <Link key={i} to={`/pet/${h.name.replace(/\s+/g, "-").toLowerCase()}`} className="related-card">
                <img src={h.images[0]} alt={h.name} />
                <div className="related-info">
                  <h4>{h.name}</h4>
                  <span>{h.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </RelatedSection>
      )}
    </DetailsStyles>
  );
}

// --- STYLED COMPONENTS ---

const DetailsStyles = styled.div`
  max-width: 1300px;
  margin: 8rem auto 4rem;
  padding: 0 2rem;

  .breadcrumb {
    margin-bottom: 2rem;
    a {
      color: #1a2e26;
      text-decoration: none;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      &:hover { color: #c5a059; }
    }
  }

  .main-layout {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 4rem;
    align-items: start;
  }

  .gallery-section {
    border-radius: 4px;
    overflow: hidden;
    cursor: zoom-in;
    img {
      width: 100%;
      height: 600px;
      object-fit: cover;
    }
  }

  .content-section {
    .category-label {
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      font-size: 0.8rem;
    }

    .horse-name {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #1a2e26;
      margin: 0.5rem 0 1.5rem;
    }

    .price-tag {
      font-size: 2rem;
      font-weight: 700;
      color: #1a2e26;
      margin-bottom: 2rem;
    }

    .description {
      font-size: 1.1rem;
      line-height: 1.8;
      color: #555;
      margin-bottom: 2.5rem;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-bottom: 3rem;
    }

    .spec-tile {
      background: #fdfcf8;
      padding: 1.5rem;
      border: 1px solid #f0efeb;
      label {
        display: block;
        font-size: 0.75rem;
        text-transform: uppercase;
        color: #c5a059;
        font-weight: 800;
        margin-bottom: 4px;
      }
      span {
        font-size: 1.2rem;
        color: #1a2e26;
        font-weight: 600;
      }
    }

    .action-buttons {
      display: flex;
      gap: 1rem;
    }

    .msg-btn {
      flex: 1;
      background: #1a2e26;
      color: white;
      border: none;
      padding: 1.2rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      cursor: pointer;
      transition: background 0.3s;
      &:hover { background: #c5a059; }
    }

    .like-btn {
      width: 60px;
      background: white;
      border: 1px solid #1a2e26;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.active { border-color: #c5a059; color: #c5a059; }
    }

    .admin-edit-btn {
      margin-top: 1.5rem;
      width: 100%;
      background: #f0efeb;
      border: none;
      padding: 0.8rem;
      color: #1a2e26;
      font-weight: 600;
      cursor: pointer;
    }
  }

  @media (max-width: 992px) {
    .main-layout { grid-template-columns: 1fr; gap: 2rem; }
    .gallery-section img { height: 400px; }
    .horse-name { font-size: 2.5rem; }
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 18, 15, 0.98); 
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);

  .close-btn {
    position: absolute;
    top: 30px;
    right: 40px;
    background: none;
    border: none;
    color: white;
    font-size: 2.5rem;
    cursor: pointer;
    z-index: 2010;
    &:hover { color: #c5a059; }
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.05);
    border: none;
    color: white;
    font-size: 3.5rem;
    padding: 2rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 2010;
    display: flex;
    align-items: center;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #c5a059;
    }
    &.left { left: 0; border-radius: 0 10px 10px 0; }
    &.right { right: 0; border-radius: 10px 0 0 10px; }
  }

  .lightbox-content {
    position: relative;
    max-width: 85%;
    max-height: 80vh;
    text-align: center;

    img {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    }

    .counter {
      color: #c5a059;
      margin-top: 20px;
      font-family: 'Playfair Display', serif;
      letter-spacing: 2px;
      font-size: 1.2rem;
    }
  }
`;

const RelatedSection = styled.div`
  margin-top: 6rem;
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #1a2e26;
  }
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
  .related-card {
    text-decoration: none;
    background: white;
    border: 1px solid #eee;
    transition: transform 0.3s;
    &:hover { transform: translateY(-5px); }
    img { width: 100%; height: 200px; object-fit: cover; }
    .related-info {
      padding: 1rem;
      h4 { color: #1a2e26; margin: 0; font-family: 'Playfair Display', serif; }
      span { color: #c5a059; font-weight: 700; }
    }
  }
`;

const LoadingState = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #c5a059;
`;

const NotFound = styled.div`
  padding: 10rem 2rem;
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  a { color: #c5a059; text-decoration: underline; }
`;