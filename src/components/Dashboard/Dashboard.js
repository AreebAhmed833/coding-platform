import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import { problems } from '../../mockData/problems';  // Import mock data

const Dashboard = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [filteredProblems, setFilteredProblems] = useState(problems);  // Use mock data

  useEffect(() => {
    let filtered = problems;  // Filter from mock data
    
    if (searchQuery) {
      filtered = filtered.filter(problem => 
        problem.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedDifficulty !== 'ALL') {
      filtered = filtered.filter(problem => 
        problem.difficulty === selectedDifficulty
      );
    }
    
    setFilteredProblems(filtered);
  }, [searchQuery, selectedDifficulty]);

  return (
    <Container>
      <Navbar />
      <Content>
        <Header>
          <HeaderContent>
            <Title>STA Practice Jan 2025</Title>
            <Subtitle>Valid till 30 Sep, 2025</Subtitle>
            <Stats>
              <StatItem>
                <StatLabel>Problems</StatLabel>
                <StatValue>{problems.length}</StatValue>
              </StatItem>
              <StatItem>
                <StatLabel>Completed</StatLabel>
                <StatValue>0</StatValue>
              </StatItem>
            </Stats>
          </HeaderContent>
        </Header>

        <FilterSection>
          <SearchBar 
            type="text" 
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FilterButtons>
            <FilterButton 
              active={selectedDifficulty === 'ALL'} 
              onClick={() => setSelectedDifficulty('ALL')}
            >
              All
            </FilterButton>
            <FilterButton 
              active={selectedDifficulty === 'EASY'}
              onClick={() => setSelectedDifficulty('EASY')}
            >
              Easy
            </FilterButton>
            <FilterButton 
              active={selectedDifficulty === 'MEDIUM'}
              onClick={() => setSelectedDifficulty('MEDIUM')}
            >
              Medium
            </FilterButton>
            <FilterButton 
              active={selectedDifficulty === 'HARD'}
              onClick={() => setSelectedDifficulty('HARD')}
            >
              Hard
            </FilterButton>
          </FilterButtons>
        </FilterSection>

        <ProblemList>
          {filteredProblems.map((problem) => (
            <ProblemCard 
              key={problem.id} 
              onClick={() => navigate(`/problem/${problem.id}`)}
            >
              <ProblemHeader>
                <ProblemMeta>
                  <ProblemNumber>{problem.id}</ProblemNumber>
                  <ProblemTitle>{problem.title}</ProblemTitle>
                </ProblemMeta>
                <ProblemStats>
                  <DifficultyBadge difficulty={problem.difficulty}>
                    {problem.difficulty}
                  </DifficultyBadge>
                  <SuccessRate>85% Success</SuccessRate>
                </ProblemStats>
              </ProblemHeader>
              {problem.description && (
                <ProblemDescription>
                  {problem.description}
                </ProblemDescription>
              )}
            </ProblemCard>
          ))}
        </ProblemList>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const Content = styled.div`
  padding-top: 64px; // Height of navbar
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 2rem 0;
  border-bottom: 1px solid ${({ theme }) => `${theme.border}30`};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const Stats = styled.div`
  display: flex;
  gap: 2rem;
`;

const StatItem = styled.div`
  background: ${({ theme }) => theme.background};
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => `${theme.border}30`};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
`;

const StatValue = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 1.5rem;
  font-weight: 700;
`;

const FilterSection = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const SearchBar = styled.input`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  width: 300px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}20`};
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme, active }) => 
    active ? theme.primary : `${theme.border}30`};
  background: ${({ theme, active }) => 
    active ? `${theme.primary}20` : theme.surface};
  color: ${({ theme, active }) => 
    active ? theme.primary : theme.text};
  font-weight: ${({ active }) => active ? '600' : '500'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    background: ${({ theme, active }) => 
      active ? `${theme.primary}20` : `${theme.primary}10`};
  }
`;

const ProblemList = styled.div`
  padding: 0 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProblemCard = styled.div`
  background: ${({ theme }) => theme.surface};
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 4px 12px ${({ theme }) => `${theme.primary}20`};
  }
`;

const ProblemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ProblemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProblemNumber = styled.span`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
`;

const ProblemTitle = styled.h2`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
`;

const ProblemStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DifficultyBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ difficulty, theme }) => 
    difficulty === 'EASY' ? theme.success :
    difficulty === 'MEDIUM' ? theme.primary :
    theme.error};
  color: white;
`;

const SuccessRate = styled.span`
  color: ${({ theme }) => theme.success};
  font-size: 0.875rem;
`;

const ProblemDescription = styled.p`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  line-height: 1.5;
`;

export default Dashboard; 