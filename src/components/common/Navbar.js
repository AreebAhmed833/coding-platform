import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <NavContainer>
      <NavLeft>
        <LogoWrapper onClick={() => navigate('/dashboard')}>
          <AnimatedLogo />
        </LogoWrapper>
        <NavLinks>
          <NavLink 
            active={location.pathname === '/dashboard'} 
            onClick={() => navigate('/dashboard')}
          >
            Problems
          </NavLink>
          <NavLink 
            active={location.pathname === '/contests'} 
            onClick={() => navigate('/contests')}
          >
            Contests
          </NavLink>
          <NavLink 
            active={location.pathname === '/leaderboard'} 
            onClick={() => navigate('/leaderboard')}
          >
            Leaderboard
          </NavLink>
        </NavLinks>
      </NavLeft>
      <NavRight>
        <ThemeToggle onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </ThemeToggle>
        <ProfileButton onClick={() => navigate('/profile')}>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <span>John Doe</span>
        </ProfileButton>
      </NavRight>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const LogoWrapper = styled.div`
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled.a`
  color: ${({ theme, active }) => active ? theme.primary : theme.text};
  text-decoration: none;
  cursor: pointer;
  padding: 0.5rem 0;
  position: relative;
  font-weight: ${({ active }) => active ? '600' : '400'};

  &:after {
    content: '';
    position: absolute;
    width: ${({ active }) => active ? '100%' : '0'};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: ${({ theme }) => theme.primary};
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  border-radius: 2rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.background};
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export default Navbar; 