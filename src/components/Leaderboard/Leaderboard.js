import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../common/Navbar';

const Leaderboard = () => {
  const [timeRange, setTimeRange] = useState('ALL_TIME');
  
  const users = [
    {
      rank: 1,
      username: "CodeMaster",
      score: 15600,
      problemsSolved: 324,
      contests: 45,
      streak: 56
    },
    {
      rank: 2,
      username: "AlgoNinja",
      score: 14200,
      problemsSolved: 298,
      contests: 38,
      streak: 42
    },
    // Add more users...
  ];

  return (
    <Container>
      <Navbar />
      <Content>
        <Header>
          <Title>Global Leaderboard</Title>
          <TimeFilter>
            <FilterButton 
              active={timeRange === 'ALL_TIME'} 
              onClick={() => setTimeRange('ALL_TIME')}
            >
              All Time
            </FilterButton>
            <FilterButton 
              active={timeRange === 'MONTHLY'} 
              onClick={() => setTimeRange('MONTHLY')}
            >
              This Month
            </FilterButton>
            <FilterButton 
              active={timeRange === 'WEEKLY'} 
              onClick={() => setTimeRange('WEEKLY')}
            >
              This Week
            </FilterButton>
          </TimeFilter>
        </Header>

        <LeaderboardTable>
          <thead>
            <TableRow>
              <TableHeader>Rank</TableHeader>
              <TableHeader>User</TableHeader>
              <TableHeader>Score</TableHeader>
              <TableHeader>Problems</TableHeader>
              <TableHeader>Contests</TableHeader>
              <TableHeader>Streak</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {users.map(user => (
              <TableRow key={user.rank}>
                <RankCell>#{user.rank}</RankCell>
                <UserCell>
                  <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
                  {user.username}
                </UserCell>
                <ScoreCell>{user.score}</ScoreCell>
                <DataCell>{user.problemsSolved}</DataCell>
                <DataCell>{user.contests}</DataCell>
                <StreakCell>🔥 {user.streak} days</StreakCell>
              </TableRow>
            ))}
          </tbody>
        </LeaderboardTable>
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

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
`;

const TableRow = styled.tr`
  background-color: ${({ theme }) => theme.surface};
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  color: ${({ theme }) => theme.text};
  font-weight: 600;
`;

const RankCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.text};
`;

const UserCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ScoreCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.text};
`;

const DataCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.text};
`;

const StreakCell = styled.td`
  padding: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
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

const TimeFilter = styled.div`
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

export default Leaderboard; 