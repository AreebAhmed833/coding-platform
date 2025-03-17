import React from 'react';
import styled, { keyframes } from 'styled-components';

const AnimatedLogo = () => {
  return (
    <LogoContainer>
      <LogoText>
        <BracketLeft>&lt;</BracketLeft>
        <MainText>
          <Gradient>Code</Gradient>
          Campus
        </MainText>
        <BracketRight>/&gt;</BracketRight>
      </LogoText>
    </LogoContainer>
  );
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.3); }
  50% { text-shadow: 0 0 20px rgba(79, 70, 229, 0.6); }
  100% { text-shadow: 0 0 5px rgba(79, 70, 229, 0.3); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LogoContainer = styled.div`
  animation: ${float} 3s ease-in-out infinite;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const BracketLeft = styled.span`
  color: ${({ theme }) => theme.secondary};
  animation: ${rotate} 4s linear infinite;
  display: inline-block;
  transform-origin: center;
`;

const BracketRight = styled(BracketLeft)`
  animation-direction: reverse;
`;

const MainText = styled.span`
  animation: ${glow} 3s ease-in-out infinite;
`;

const Gradient = styled.span`
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-right: 4px;
`;

export default AnimatedLogo; 