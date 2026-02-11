import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, X } from 'react-bootstrap-icons';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import { AuthContext } from '../../Context/AuthContext';

function Navbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { activeUser, logout } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <NavbarContainer>
      <MenuIcon
        size={32}
        onClick={handleShow}
        aria-label="Open navigation menu"
      />
      
      {/* Changed placement to "end" for right-side entry */}
      <StyledOffcanvas show={show} onHide={handleClose} placement="end">
        <OffcanvasHeader>
          <BrandLogo onClick={() => handleNavigate('/')}>
            EQUINE<span>EXCELLENCE</span>
          </BrandLogo>
          <CloseButton onClick={handleClose}>
            <X size={35} />
          </CloseButton>
        </OffcanvasHeader>
        
        <Offcanvas.Body>
          <NavGroup>
            <NavLabel>General</NavLabel>
            <NavItem onClick={() => handleNavigate('/')}>Home</NavItem>
            <NavItem onClick={() => handleNavigate('/about')}>Our Story</NavItem>
            <NavItem onClick={() => handleNavigate('/delivery-options')}>Delivery & Rehoming</NavItem>
          </NavGroup>

          <NavGroup>
            <NavLabel>The Collection</NavLabel>
            <NavItem onClick={() => handleNavigate('/all-pets')}>Available Horses</NavItem>
            <NavItem onClick={() => handleNavigate('/all-pets?category=Top Views')}>Elite Stallions</NavItem>
            <NavItem onClick={() => handleNavigate('/contact-us')}>Inquiry Desk</NavItem>
          </NavGroup>

          {activeUser && (
            <NavGroup>
              <NavLabel>Registry Management</NavLabel>
              <NavItem onClick={() => handleNavigate('/upload-horse')}>Add New Listing</NavItem>
              <NavItem 
                className="logout"
                onClick={() => {
                  logout();
                  handleNavigate('/');
                }}
              >
                Sign Out
              </NavItem>
            </NavGroup>
          )}

          <NavFooter>
            <p>© 2026 Equine Excellence</p>
            <p>Ethical Rehoming & Heritage</p>
          </NavFooter>
        </Offcanvas.Body>
      </StyledOffcanvas>
    </NavbarContainer>
  );
}

export default Navbar;

const NavbarContainer = styled.div`
  position: fixed;
  top: 25px;
  right: 25px; /* Moved from left to right */
  z-index: 1100;
`;

const MenuIcon = styled(List)`
  cursor: pointer;
  color: #1a2e26;
  background: white;
  padding: 8px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    color: #c5a059;
  }
`;

const StyledOffcanvas = styled(Offcanvas)`
  width: 320px !important;
  background-color: #1a2e26 !important; /* Deep Green */
  color: white !important;
  border-left: 1px solid rgba(197, 160, 89, 0.3) !important; /* Subtle gold edge border */
  border-right: none !important;
`;

const OffcanvasHeader = styled.div`
  padding: 40px 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BrandLogo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  letter-spacing: 2px;
  cursor: pointer;
  color: white;
  
  span {
    color: #c5a059;
    font-weight: 300;
    display: block;
    font-size: 0.7rem;
    letter-spacing: 5px;
  }
`;

const CloseButton = styled.div`
  cursor: pointer;
  color: #c5a059;
  &:hover { color: white; }
`;

const NavGroup = styled.div`
  margin-bottom: 2.5rem;
  padding: 0 15px;
`;

const NavLabel = styled.span`
  display: block;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #c5a059;
  margin-bottom: 1rem;
  font-weight: 700;
  opacity: 0.8;
`;

const NavItem = styled.div`
  padding: 0.8rem 0;
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: #f1f1f1;

  &:hover {
    color: #c5a059;
    padding-left: 10px;
  }

  &.logout {
    color: #ff6b6b;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    border: none;
  }
`;

const NavFooter = styled.div`
  margin-top: 4rem;
  padding: 0 15px;
  p {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.4);
    margin: 2px 0;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`;