'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const CoursesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--text-primary);
  text-align: center;
`;

const FiltersSection = styled.div`
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const FiltersTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--bg-primary)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-hover)' : 'var(--bg-tertiary)'};
  }
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const CourseCard = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const CourseImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const CourseContent = styled.div`
  padding: 1.5rem;
`;

const CourseTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
`;

const CourseDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CourseLevel = styled.span`
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
`;

const CourseDuration = styled.span`
  color: var(--text-muted);
  font-size: 0.9rem;
`;

const EnrollButton = styled.button`
  width: 100%;
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: var(--primary-hover);
  }
`;

const courses = [
  {
    id: 1,
    title: 'JavaScript Основы',
    description: 'Изучите основы JavaScript с нуля. Переменные, функции, объекты и многое другое.',
    level: 'Начинающий',
    duration: '8 недель',
    category: 'javascript',
    icon: '⚡'
  },
  {
    id: 2,
    title: 'React Разработка',
    description: 'Создавайте современные веб-приложения с React. Компоненты, хуки, состояние.',
    level: 'Средний',
    duration: '10 недель',
    category: 'react',
    icon: '⚛️'
  },
  {
    id: 3,
    title: 'Node.js Backend',
    description: 'Разрабатывайте серверную часть приложений с Node.js и Express.',
    level: 'Средний',
    duration: '12 недель',
    category: 'nodejs',
    icon: '🟢'
  },
  {
    id: 4,
    title: 'Python Основы',
    description: 'Начните программировать на Python. Синтаксис, структуры данных, функции.',
    level: 'Начинающий',
    duration: '6 недель',
    category: 'python',
    icon: '🐍'
  },
  {
    id: 5,
    title: 'TypeScript',
    description: 'Добавьте типизацию в JavaScript. Интерфейсы, типы, дженерики.',
    level: 'Средний',
    duration: '8 недель',
    category: 'typescript',
    icon: '📘'
  },
  {
    id: 6,
    title: 'Vue.js',
    description: 'Изучите Vue.js - прогрессивный JavaScript фреймворк.',
    level: 'Средний',
    duration: '9 недель',
    category: 'vue',
    icon: '💚'
  }
];

const categories = ['Все', 'javascript', 'react', 'nodejs', 'python', 'typescript', 'vue'];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredCourses = selectedCategory === 'Все' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <CoursesContainer>
      <PageTitle>Курсы программирования</PageTitle>
      
      <FiltersSection>
        <FiltersTitle>Фильтры</FiltersTitle>
        <FilterButtons>
          {categories.map(category => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'Все' ? 'Все курсы' : category}
            </FilterButton>
          ))}
        </FilterButtons>
      </FiltersSection>
      
      <CoursesGrid>
        {filteredCourses.map(course => (
          <CourseCard key={course.id}>
            <CourseImage>
              {course.icon}
            </CourseImage>
            <CourseContent>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <CourseMeta>
                <CourseLevel>{course.level}</CourseLevel>
                <CourseDuration>{course.duration}</CourseDuration>
              </CourseMeta>
              <EnrollButton>Записаться на курс</EnrollButton>
            </CourseContent>
          </CourseCard>
        ))}
      </CoursesGrid>
    </CoursesContainer>
  );
} 