'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const buttonVariants = {
  primary: css`
    background: var(--primary-color);
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background: var(--primary-hover);
    }
  `,
  secondary: css`
    background: var(--bg-secondary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    
    &:hover:not(:disabled) {
      background: var(--bg-tertiary);
    }
  `,
  outline: css`
    background: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover:not(:disabled) {
      background: var(--primary-color);
      color: white;
    }
  `
};

const buttonSizes = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  `,
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  `,
  large: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
  `
};

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  ${props => buttonVariants[props.variant || 'primary']}
  ${props => buttonSizes[props.size || 'medium']}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`;

export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  ...props 
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
} 