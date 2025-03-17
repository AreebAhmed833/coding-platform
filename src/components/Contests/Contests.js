import React from 'react';
import styled from 'styled-components';
import Navbar from '../common/Navbar';

const Contests = () => {
  const contests = [
    {
      id: 1,
      title: "Weekly Challenge #45",
      startTime: "2024-02-20T15:00:00Z",
      duration: "2 hours",
      participants: 1234,
      status: "UPCOMING"
    },
    {
      id: 2,
      title: "Code Sprint 2024",
      startTime: "2024-02-18T10:00:00Z",
      duration: "3 hours",
      participants: 2156,
      status: "COMPLETED"
    },
    // Add more contests...
  ];

  return (
    <Container>
      <Navbar />
      <Content>
        <Header>
          <Title>Coding Contests</Title>
          <FilterButtons>
            <FilterButton active>All</FilterButton>
            <FilterButton>Upcoming</FilterButton>
            <FilterButton>Active</FilterButton>
            <FilterButton>Past</FilterButton>
          </FilterButtons>
        </Header>

        <ContestGrid>
          {contests.map(contest => (
            <ContestCard key={contest.id}>
              <CardHeader>
                <ContestTitle>{contest.title}</ContestTitle>
                <StatusBadge status={contest.status}>
                  {contest.status}
                </StatusBadge>
              </CardHeader>
              <CardContent>
                <InfoItem>
                  <Label>Start Time:</Label>
                  <Value>{new Date(contest.startTime).toLocaleString()}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Duration:</Label>
                  <Value>{contest.duration}</Value>
                </InfoItem>
                <InfoItem>
                  <Label>Participants:</Label>
                  <Value>{contest.participants}</Value>
                </InfoItem>
              </CardContent>
              <JoinButton>
                {contest.status === 'UPCOMING' ? 'Register Now' : 'View Details'}
              </JoinButton>
            </ContestCard>
          ))}
        </ContestGrid>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
`;

const Content = styled.div`
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ active, theme }) => active ? theme.primary : theme.surface};
  color: ${({ active, theme }) => active ? 'white' : theme.text};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ContestCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContestTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const StatusBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  background-color: ${({ theme, status }) =>
    status === 'UPCOMING' ? theme.primary :
    status === 'COMPLETED' ? theme.secondary :
    theme.surface};
  color: ${({ theme, status }) =>
    status === 'UPCOMING' ? 'white' :
    status === 'COMPLETED' ? theme.text :
    theme.text};
`;

const CardContent = styled.div`
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Value = styled.span`
  margin-left: 0.5rem;
`;

const JoinButton = styled.button`
  padding: 0.75rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
`;

export default Contests; 