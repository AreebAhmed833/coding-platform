import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ProblemDetail from './components/Problem/ProblemDetail';
import Contests from './components/Contests/Contests';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Profile from './components/Profile/Profile';

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problem/:id" element={<ProblemDetail />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
};

export default App;
