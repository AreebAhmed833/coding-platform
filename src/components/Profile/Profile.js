import React from 'react';
import styled from 'styled-components';
import Navbar from '../common/Navbar';

const Profile = () => {
  const user = {
    username: "CodeMaster",
    email: "codemaster@example.com",
    joinDate: "2023-01-15",
    stats: {
      problemsSolved: 324,
      totalSubmissions: 856,
      acceptanceRate: "78%",
      contestsParticipated: 45,
      currentStreak: 56,
      longestStreak: 89
    },
    recentActivity: [
      {
        type: "SOLVED",
        problem: "Make a Number",
        timestamp: "2024-02-19T14:30:00Z"
      },
      // Add more activities...
    ]
  };

  return (
    <Container>
      <Navbar />
      <Content>
        <ProfileHeader>
          <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} />
          <UserInfo>
            <Username>{user.username}</Username>
            <JoinDate>Member since {new Date(user.joinDate).toLocaleDateString()}</JoinDate>
          </UserInfo>
        </ProfileHeader>

        <StatsGrid>
          <StatCard>
            <StatTitle>Problems Solved</StatTitle>
            <StatValue>{user.stats.problemsSolved}</StatValue>
          </StatCard>
          {/* Add more stat cards */}
        </StatsGrid>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          <ActivityList>
            {user.recentActivity.map((activity, index) => (
              <ActivityItem key={index}>
                <ActivityIcon type={activity.type}>
                  {activity.type === 'SOLVED' ? '✅' : '❌'}
                </ActivityIcon>
                <ActivityDetails>
                  <ActivityTitle>{activity.problem}</ActivityTitle>
                  <ActivityTime>
                    {new Date(activity.timestamp).toLocaleString()}
                  </ActivityTime>
                </ActivityDetails>
              </ActivityItem>
            ))}
          </ActivityList>
        </Section>
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

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.primary};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Username = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
`;

const JoinDate = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const StatTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.surface};
  border-radius: 8px;
  transition: transform 0.2s;

  &:hover {
    transform: translateX(4px);
  }
`;

const ActivityIcon = styled.div`
  font-size: 1.5rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ type, theme }) => 
    type === 'SOLVED' ? theme.success + '20' : theme.error + '20'};
  color: ${({ type, theme }) => 
    type === 'SOLVED' ? theme.success : theme.error};
  border-radius: 50%;
`;

const ActivityDetails = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
`;

export default Profile; 