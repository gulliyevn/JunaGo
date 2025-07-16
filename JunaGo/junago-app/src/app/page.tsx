'use client';

import React from 'react';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled.button`
  background: white;
  color: var(--primary-color);
  border: none;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: var(--bg-secondary);
`;

const FeaturesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const FeatureDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

export default function HomePage() {
  return (
    <main>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Изучайте программирование с JunaGO</HeroTitle>
          <HeroSubtitle>
            Современная платформа с интерактивными курсами, проектами и поддержкой сообщества
          </HeroSubtitle>
          <CTAButton>Начать обучение</CTAButton>
        </HeroContent>
      </HeroSection>
      
      <FeaturesSection>
        <FeaturesContent>
          <SectionTitle>Почему JunaGO?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Практический подход</FeatureTitle>
              <FeatureDescription>
                Изучайте программирование через реальные проекты и задачи
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🚀</FeatureIcon>
              <FeatureTitle>Современные технологии</FeatureTitle>
              <FeatureDescription>
                Изучайте актуальные языки программирования и фреймворки
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>👥</FeatureIcon>
              <FeatureTitle>Сообщество</FeatureTitle>
              <FeatureDescription>
                Присоединяйтесь к сообществу разработчиков и обменивайтесь опытом
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>📱</FeatureIcon>
              <FeatureTitle>Адаптивный дизайн</FeatureTitle>
              <FeatureDescription>
                Учитесь на любом устройстве с удобным интерфейсом
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🎨</FeatureIcon>
              <FeatureTitle>Темная тема</FeatureTitle>
              <FeatureDescription>
                Комфортное обучение в любое время суток
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>🏆</FeatureIcon>
              <FeatureTitle>Достижения</FeatureTitle>
              <FeatureDescription>
                Отслеживайте прогресс и получайте сертификаты
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContent>
      </FeaturesSection>
    </main>
  );
}
