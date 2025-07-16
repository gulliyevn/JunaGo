'use client';

import React from 'react';
import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  padding?: 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  onClick?: () => void;
}

const paddingSizes = {
  small: '1rem',
  medium: '1.5rem',
  large: '2rem'
};

const shadowSizes = {
  none: 'none',
  small: 'var(--shadow-sm)',
  medium: 'var(--shadow-md)',
  large: 'var(--shadow-lg)'
};

const StyledCard = styled.div<CardProps>`
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: ${props => paddingSizes[props.padding || 'medium']};
  box-shadow: ${props => shadowSizes[props.shadow || 'small']};
  transition: all 0.2s ease;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  
  ${props => props.hover && `
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
  `}
`;

export function Card({ 
  children, 
  padding = 'medium', 
  shadow = 'small',
  hover = false,
  onClick,
  ...props 
}: CardProps) {
  return (
    <StyledCard
      padding={padding}
      shadow={shadow}
      hover={hover}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledCard>
  );
} 