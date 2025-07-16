'use client';

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  p, a {
    color: var(--text-secondary);
    line-height: 1.6;
  }
  
  a:hover {
    color: var(--primary-color);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
  color: var(--text-muted);
`;

export function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>JunaGO</h3>
          <p>
            Современная образовательная платформа для изучения программирования 
            с интерактивными курсами и проектами.
          </p>
        </FooterSection>
        
        <FooterSection>
          <h3>Курсы</h3>
          <p>JavaScript</p>
          <p>React</p>
          <p>Node.js</p>
          <p>Python</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Поддержка</h3>
          <p>FAQ</p>
          <p>Документация</p>
          <p>Сообщество</p>
          <p>Контакты</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Социальные сети</h3>
          <p>Telegram</p>
          <p>YouTube</p>
          <p>GitHub</p>
          <p>Discord</p>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; 2024 JunaGO. Все права защищены.</p>
      </FooterBottom>
    </FooterContainer>
  );
} 