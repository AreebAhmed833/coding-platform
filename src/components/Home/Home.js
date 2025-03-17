import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar />
      <HeroSection>
        <Content>
          <HeroContent>
            <Title>
              Master Your <GradientText>Coding Skills</GradientText>
              <br />One Problem at a Time
            </Title>
            <Description>
              Practice coding, prepare for interviews, and enhance your programming skills
              with our curated collection of coding challenges.
            </Description>
            <CTAButton onClick={() => navigate('/dashboard')}>
              Start Coding Now
            </CTAButton>
          </HeroContent>
          <StatsSection>
            <StatCard>
              <StatNumber>500+</StatNumber>
              <StatLabel>Coding Problems</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>50K+</StatNumber>
              <StatLabel>Active Users</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>100+</StatNumber>
              <StatLabel>Daily Challenges</StatLabel>
            </StatCard>
          </StatsSection>
        </Content>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Why Choose Us?</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>🎯</FeatureIcon>
            <FeatureTitle>Targeted Practice</FeatureTitle>
            <FeatureDescription>
              Problems categorized by difficulty and topics for focused learning
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>⚡</FeatureIcon>
            <FeatureTitle>Real-time Feedback</FeatureTitle>
            <FeatureDescription>
              Instant test results and performance metrics for your solutions
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🏆</FeatureIcon>
            <FeatureTitle>Competitive Learning</FeatureTitle>
            <FeatureDescription>
              Participate in contests and compare your progress with peers
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  background-image: 
    radial-gradient(circle at 0% 0%, ${({ theme }) => `${theme.primary}10`} 0%, transparent 40%),
    radial-gradient(circle at 100% 100%, ${({ theme }) => `${theme.secondary}10`} 0%, transparent 40%);
`;

const HeroSection = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 80px 0;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  line-height: 1.2;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
`;

const CTAButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px ${({ theme }) => `${theme.primary}40`};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px ${({ theme }) => `${theme.primary}60`};
  }
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px ${({ theme }) => `${theme.primary}20`};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
`;

const FeaturesSection = styled.div`
  padding: 6rem 2rem;
  background: ${({ theme }) => `${theme.surface}95`};
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.text};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px ${({ theme }) => `${theme.primary}20`};
    border-color: ${({ theme }) => theme.primary};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

export default Home; 