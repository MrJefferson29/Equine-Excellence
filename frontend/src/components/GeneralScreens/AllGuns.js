import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FiHeart, FiSearch, FiFilter } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AllHorses() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allHorses, setAllHorses] = useState([]);
  const [filteredHorses, setFilteredHorses] = useState([]);
  const [category, setCategory] = useState('All');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        const { data } = await axios.get('/api/horses');
        setAllHorses(data);
        const queryParams = new URLSearchParams(location.search);
        const categoryFromQuery = queryParams.get('category') || 'All';
        setCategory(categoryFromQuery);
        applyFilters(searchTerm, categoryFromQuery, data);
      } catch (error) {
        console.error("Error loading horses", error);
      }
    };
    fetchHorses();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromQuery = queryParams.get('category') || 'All';
    setCategory(categoryFromQuery);
    applyFilters(searchTerm, categoryFromQuery, allHorses);
  }, [location.search, searchTerm, allHorses]);

  const categories = ['All', ...new Set(allHorses.map(h => h.category))];

  const applyFilters = (term, selectedCategory, source) => {
    const filtered = (source || []).filter(horse => {
      const matchesSearch = horse.name.toLowerCase().includes(term.toLowerCase()) || 
                           (horse.description || "").toLowerCase().includes(term.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || horse.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredHorses(filtered);
  };

  const handleCategoryClick = (cat) => {
    navigate(`/all-pets?category=${encodeURIComponent(cat)}`);
  };

  const handleCardClick = (name) => {
    const formattedName = name.replace(/\s+/g, '-').toLowerCase();
    navigate(`/pet/${formattedName}`);
  };

  return (
    <PageWrapper>
      <header className="catalog-header">
        <span className="pre-title">Exclusive Collection</span>
        <h1>Equine Listings</h1>
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by breed, name or discipline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <FilterBar>
        <div className="filter-label">
          <FiFilter /> <span>Filter Breed:</span>
        </div>
        <div className="category-scroll">
          {categories.map((cat, index) => (
            <button
              key={index}
              className={category === cat ? 'active' : ''}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterBar>

      <GridContainer>
        {filteredHorses.map((horse, index) => (
          <HorseCard key={index} onClick={() => handleCardClick(horse.name)}>
            <div className="img-container">
              <img src={horse.images[0]} alt={horse.name} />
              <div className="category-tag">{horse.category}</div>
              <button className="wishlist-btn" onClick={(e) => e.stopPropagation()}>
                <FiHeart />
              </button>
            </div>

            <div className="card-content">
              <div className="main-info">
                <h3>{horse.name}</h3>
                <span className="price">{horse.price}</span>
              </div>
              
              <div className="spec-grid">
                <div className="spec-item"><span>Sex:</span> {horse.sex}</div>
                <div className="spec-item"><span>Age:</span> {horse.age}</div>
                <div className="spec-item"><span>Status:</span> Verified</div>
                <div className="spec-item"><span>Health:</span> Vaccinated</div>
              </div>

              <p className="desc">
                {horse.description?.split(' ').slice(0, 12).join(' ')}...
              </p>

              <div className="card-footer">
                <span className="views">{horse.views} enthusiasts viewing</span>
                <span className="view-link">View Portfolio →</span>
              </div>
            </div>
          </HorseCard>
        ))}
      </GridContainer>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;

  .catalog-header {
    text-align: center;
    margin-bottom: 3rem;

    .pre-title {
      text-transform: uppercase;
      letter-spacing: 4px;
      color: #c5a059;
      font-weight: 700;
      font-size: 0.8rem;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      color: #1a2e26;
      margin: 1rem 0 2rem;
    }
  }

  .search-container {
    position: relative;
    max-width: 600px;
    margin: 0 auto;

    .search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #c5a059;
    }

    input {
      width: 100%;
      padding: 1.2rem 1.2rem 1.2rem 3.5rem;
      border: 1px solid #ddd;
      border-radius: 50px;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fff;

      &:focus {
        outline: none;
        border-color: #c5a059;
        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
      }
    }
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;

  .filter-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    color: #1a2e26;
    white-space: nowrap;
  }

  .category-scroll {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 5px;
    &::-webkit-scrollbar { display: none; }

    button {
      background: none;
      border: none;
      padding: 0.5rem 1rem;
      white-space: nowrap;
      color: #777;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;

      &.active {
        color: #1a2e26;
        font-weight: 700;
        
        &::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #c5a059;
        }
      }
    }
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
`;

const HorseCard = styled.div`
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  }

  .img-container {
    position: relative;
    height: 240px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .category-tag {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(26, 46, 38, 0.8);
      backdrop-filter: blur(5px);
      color: white;
      padding: 4px 12px;
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .wishlist-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: white;
      border: none;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      transition: 0.3s;
      &:hover { color: #e74c3c; }
    }
  }

  .card-content {
    padding: 1.5rem;

    .main-info {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 1rem;

      h3 {
        font-family: 'Playfair Display', serif;
        font-size: 1.4rem;
        color: #1a2e26;
        margin: 0;
      }

      .price {
        font-weight: 700;
        color: #c5a059;
        font-size: 1.2rem;
      }
    }

    .spec-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 1rem;
      padding: 1rem 0;
      border-top: 1px solid #f5f5f5;
      border-bottom: 1px solid #f5f5f5;

      .spec-item {
        font-size: 0.85rem;
        color: #333;
        span { color: #c5a059; font-weight: 700; margin-right: 4px; }
      }
    }

    .desc {
      font-size: 0.9rem;
      color: #666;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.75rem;

      .views { color: #999; }
      .view-link {
        font-weight: 700;
        color: #1a2e26;
        text-transform: uppercase;
      }
    }
  }
`;