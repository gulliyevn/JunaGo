// src/App.js (с системой безопасности и оптимизацией производительности)
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './utils/themeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

// Критические компоненты загружаем сразу
import Hero from './components/Hero/Hero';
import ImageSlider from './components/ImageSlider/ImageSlider';
import Features from './components/Features/Features';
import SalaryCalculator from './components/SalaryCalculator/SalaryCalculator';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials/Testimonials';
import ChatbotWidget from './components/Chatbot/ChatbotWidget';
import ChatbotButton from './components/Chatbot/ChatbotButton';
import MainLayout from './components/layout/MainLayout';

// Ленивая загрузка для основных страниц
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const CourseIntro = lazy(() => import('./pages/CourseIntro'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const UpgradePlan = lazy(() => import('./pages/UpgradePlan'));

// Ленивая загрузка для редко используемых страниц
const RoadmapPage = lazy(() => import('./pages/Roadmap/RoadmapPage'));
const ContactPage = lazy(() => import('./pages/Contact/ContactPage'));
const FeedbackPage = lazy(() => import('./pages/Feedback/FeedbackPage'));
const LearningPathPage = lazy(() => import('./pages/LearningPath/LearningPathPage'));
const CartPage = lazy(() => import('./pages/Cart/CartPage'));
const Articles = lazy(() => import('./pages/Articles'));
const ProjectsPage = lazy(() => import('./pages/Projects/ProjectsPage'));

// Тяжелые компоненты с ленивой загрузкой
const WorkspacePage = lazy(() => import('./pages/Workspace/WorkspacePage'));
const CodeEditor = lazy(() => import('./pages/CodeEditor'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Messages = lazy(() => import('./pages/Messages'));
const Teams = lazy(() => import('./pages/Teams'));
const Settings = lazy(() => import('./pages/Settings'));

// Компонент загрузки с прогрессом
const SuspenseWrapper = ({ children, fallback = <LoadingSpinner /> }) => (
  <Suspense fallback={fallback}>
    {children}
  </Suspense>
);

// Простые компоненты без ленивой загрузки
const ProjectPage = () => (
  <div className="container">
    <h1>Project Page</h1>
    <p>Explore our projects and get involved in the development process.</p>
    <div className="projects-section">
      <div className="project-card">
        <h2>Open Source Libraries</h2>
        <p>Contribute to our open source libraries and tools.</p>
      </div>
      <div className="project-card">
        <h2>Student Projects</h2>
        <p>See what our students are building and get inspired.</p>
      </div>
    </div>
  </div>
);

const NotFoundPage = () => (
  <div className="container text-center">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist or has been moved.</p>
  </div>
);

const HomePage = () => (
  <>
    <Hero />
    <ImageSlider />
    <Features />
    <SalaryCalculator />
    <Pricing />
    <Testimonials />
  </>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <ChatbotProvider>
              <Routes>
                {/* Главная страница - загружается сразу */}
                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                
                {/* Публичные страницы с ленивой загрузкой */}
                <Route path="/courses" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <Courses />
                    </SuspenseWrapper>
                  </MainLayout>
                } />
                
                <Route path="/pricing" element={<MainLayout><Pricing /></MainLayout>} />
                
                <Route path="/articles" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <Articles />
                    </SuspenseWrapper>
                  </MainLayout>
                } />
                
                <Route path="/roadmap" element={
                  <SuspenseWrapper>
                    <RoadmapPage />
                  </SuspenseWrapper>
                } />
                
                <Route path="/contact" element={
                  <SuspenseWrapper>
                    <ContactPage />
                  </SuspenseWrapper>
                } />
                
                <Route path="/feedback" element={
                  <SuspenseWrapper>
                    <FeedbackPage />
                  </SuspenseWrapper>
                } />
                
                <Route path="/learning-path" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <LearningPathPage />
                    </SuspenseWrapper>
                  </MainLayout>
                } />

                {/* Аутентификация */}
                <Route path="/login" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <Login />
                    </SuspenseWrapper>
                  </MainLayout>
                } />
                
                <Route path="/signup" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <Signup />
                    </SuspenseWrapper>
                  </MainLayout>
                } />
                
                <Route path="/forgot-password" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <ForgotPassword />
                    </SuspenseWrapper>
                  </MainLayout>
                } />
                
                <Route path="/reset-password" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <ResetPassword />
                    </SuspenseWrapper>
                  </MainLayout>
                } />

                {/* Защищенные страницы */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <SuspenseWrapper>
                        <StudentDashboard />
                      </SuspenseWrapper>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/courses/:courseId" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <SuspenseWrapper>
                        <CourseDetail />
                      </SuspenseWrapper>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/courses/:courseId/lessons/:lessonId" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <SuspenseWrapper>
                        <CourseIntro />
                      </SuspenseWrapper>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                <Route path="/courses/:courseId/lessons/:lessonId/content" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <SuspenseWrapper>
                        <CourseDetail />
                      </SuspenseWrapper>
                    </MainLayout>
                  </ProtectedRoute>
                } />
                
                {/* Тяжелые компоненты - максимальная оптимизация */}
                <Route path="/workspace" element={
                  <ProtectedRoute requirePremium>
                    <SuspenseWrapper fallback={<div>Loading Workspace...</div>}>
                      <WorkspacePage />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/code-editor" element={
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <CodeEditor />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <Analytics />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <Messages />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/teams" element={
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <Teams />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <Settings />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/projects" element={
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <ProjectsPage />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/projects/:projectId" element={
                  <ProtectedRoute>
                    <SuspenseWrapper>
                      <ProjectsPage />
                    </SuspenseWrapper>
                  </ProtectedRoute>
                } />
                
                <Route path="/upgrade" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <UpgradePlan />
                    </SuspenseWrapper>
                  </MainLayout>
                } />
                
                <Route path="/cart" element={
                  <MainLayout>
                    <SuspenseWrapper>
                      <CartPage />
                    </SuspenseWrapper>
                  </MainLayout>
                } />

                {/* Редиректы */}
                <Route path="/community" element={<Navigate to="/projects" replace />} />

                {/* 404 страница */}
                <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
              </Routes>
              
              {/* Chatbot компоненты */}
              <ChatbotWidget />
              <ChatbotButton />
            </ChatbotProvider>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;