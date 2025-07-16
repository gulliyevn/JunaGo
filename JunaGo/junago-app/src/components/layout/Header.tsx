'use client';

import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/lib/theme-provider';

const HeaderContainer = styled.header`
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: var(--text-secondary);
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const ThemeToggle = styled.button`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 0.5rem;
  color: var(--text-primary);
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--bg-tertiary);
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>JunaGO</Logo>
        
        <Nav>
          <NavLink href="/">Главная</NavLink>
          <NavLink href="/courses">Курсы</NavLink>
          <NavLink href="/about">О нас</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
          <ThemeToggle onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
        </Nav>
        
        <MobileMenu>
          <ThemeToggle onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </ThemeToggle>
        </MobileMenu>
      </HeaderContent>
    </HeaderContainer>
  );
} 