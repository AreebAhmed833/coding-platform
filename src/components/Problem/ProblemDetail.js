import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Editor from "@monaco-editor/react";
import { useParams } from 'react-router-dom';
import { problems } from '../../mockData/problems';
import Navbar from '../common/Navbar';
import { FiClock as TimeIcon, FiHardDrive as MemoryIcon, FiCheckCircle as SuccessIcon } from 'react-icons/fi';

const getStarterCode = (language) => {
  switch (language) {
    case 'javascript':
      return `// Write your JavaScript solution here
function solution(input) {
  // Your code here
  
  return result;
}`;
    case 'python':
      return `# Write your Python solution here
def solution(input):
    # Your code here
    
    return result`;
    case 'java':
      return `// Write your Java solution here
public class Solution {
    public static void main(String[] args) {
        // Your code here
    }
}`;
    case 'cpp':
      return `// Write your C++ solution here
#include <iostream>
using namespace std;

int main() {
    // Your code here
    
    return 0;
}`;
    default:
      return '// Write your code here';
  }
};

const ProblemDetail = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [submissionResults, setSubmissionResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editorMounted, setEditorMounted] = useState(false);
  const editorRef = useRef(null);

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(getStarterCode(newLanguage));
    if (editorRef.current) {
      editorRef.current.setValue(getStarterCode(newLanguage));
    }
  };

  useEffect(() => {
    const loadProblem = async () => {
      try {
        setIsLoading(true);
        const foundProblem = problems.find(p => p.id === parseInt(id));
        if (!foundProblem) {
          throw new Error('Problem not found');
        }
        setProblem(foundProblem);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProblem();
  }, [id]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (e.shiftKey) {
          handleSubmit();
        } else {
          handleRun();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleRun = () => {
    setIsRunning(true);
    // Simulate test case execution
    setTimeout(() => {
      setTestResults({
        passed: 3,
        total: 4,
        cases: [
          { id: 1, status: 'PASSED', input: 'test input 1', output: 'test output 1', expected: 'test output 1' },
          { id: 2, status: 'PASSED', input: 'test input 2', output: 'test output 2', expected: 'test output 2' },
          { id: 3, status: 'PASSED', input: 'test input 3', output: 'test output 3', expected: 'test output 3' },
          { id: 4, status: 'FAILED', input: 'test input 4', output: 'wrong output', expected: 'test output 4' }
        ]
      });
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsRunning(true);
    // Simulate submission and test case execution
    setTimeout(() => {
      const results = {
        passed: 6,
        total: 8,
        cases: [
          { id: 1, status: 'PASSED', input: 'test input 1', output: 'test output 1', expected: 'test output 1' },
          { id: 2, status: 'PASSED', input: 'test input 2', output: 'test output 2', expected: 'test output 2' },
          { id: 3, status: 'PASSED', input: 'test input 3', output: 'test output 3', expected: 'test output 3' },
          { id: 4, status: 'FAILED', input: 'test input 4', output: 'wrong output', expected: 'test output 4' },
          { id: 5, status: 'PASSED', input: 'test input 5', output: 'test output 5', expected: 'test output 5' },
          { id: 6, status: 'PASSED', input: 'test input 6', output: 'test output 6', expected: 'test output 6' },
          { id: 7, status: 'PASSED', input: 'test input 7', output: 'test output 7', expected: 'test output 7' },
          { id: 8, status: 'FAILED', input: 'test input 8', output: 'incorrect output', expected: 'test output 8' }
        ]
      };
      setSubmissionResults(results);
      setTestResults(results); // Show results in the test panel
      setIsRunning(false);
    }, 2000);
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    setEditorMounted(true);
    
    monaco.editor.defineTheme('customDark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'keyword', foreground: 'ff79c6', fontStyle: 'bold' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'operator', foreground: 'ff79c6' }
      ],
      colors: {
        'editor.background': '#0A0F1A',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#1F2937',
        'editor.selectionBackground': '#374151',
        'editor.inactiveSelectionBackground': '#374151',
        'editorCursor.foreground': '#f8f8f2',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#F9FAFB',
        'editor.selectionHighlightBackground': '#374151',
        'editor.wordHighlightBackground': '#374151',
        'editor.wordHighlightStrongBackground': '#374151',
        'editorBracketMatch.background': '#374151',
        'editorBracketMatch.border': '#6366F1'
      }
    });
    
    monaco.editor.setTheme('customDark');

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleRun();
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      handleSubmit();
    });
  };

  useEffect(() => {
    // Cleanup function for editor
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Navbar />
      <Content>
        <ProblemSection>
          <QuestionHeader>
            <QuestionTitle>{problem.title}</QuestionTitle>
            <DifficultyBadge difficulty={problem.difficulty}>
              {problem.difficulty}
            </DifficultyBadge>
            <QuestionMeta>
              <MetaItem>
                <TimeIcon /> {problem.timeLimit}
              </MetaItem>
              <MetaItem>
                <MemoryIcon /> {problem.memoryLimit}
              </MetaItem>
              <MetaItem>
                <SuccessIcon /> Success Rate: 65%
              </MetaItem>
            </QuestionMeta>
          </QuestionHeader>

          <Section>
            <SectionTitle>Problem Description</SectionTitle>
            <Description>{problem.description}</Description>
          </Section>

          <Section>
            <SectionTitle>Input Format</SectionTitle>
            <Description>{problem.inputFormat}</Description>
          </Section>

          <Section>
            <SectionTitle>Output Format</SectionTitle>
            <Description>{problem.outputFormat}</Description>
          </Section>

          <Section>
            <SectionTitle>Sample Input</SectionTitle>
            <CodeBlock>{problem.sampleInput}</CodeBlock>
          </Section>

          <Section>
            <SectionTitle>Sample Output</SectionTitle>
            <CodeBlock>{problem.sampleOutput}</CodeBlock>
          </Section>

          <Section>
            <SectionTitle>Constraints</SectionTitle>
            <List>
              <ListItem>Time Limit: {problem.timeLimit}</ListItem>
              <ListItem>Memory Limit: {problem.memoryLimit}</ListItem>
            </List>
          </Section>
        </ProblemSection>

        <EditorSection>
          <EditorHeader>
            <LanguageSelect 
              value={language} 
              onChange={handleLanguageChange}
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </LanguageSelect>
            <ButtonGroup>
              <RunButtonWithTooltip>
                <RunButton onClick={handleRun} disabled={isRunning}>
                  {isRunning ? <Spinner /> : 'Run'}
                </RunButton>
                <ButtonTooltip>Run (Ctrl/⌘ + Enter)</ButtonTooltip>
              </RunButtonWithTooltip>
              <RunButtonWithTooltip>
                <SubmitButton onClick={handleSubmit} disabled={isRunning}>
                  {isRunning ? <Spinner /> : 'Submit'}
                </SubmitButton>
                <ButtonTooltip>Submit (Ctrl/⌘ + Shift + Enter)</ButtonTooltip>
              </RunButtonWithTooltip>
            </ButtonGroup>
          </EditorHeader>
          <EditorContainer>
            <StatusBar>
              <StatusItem>
                {language.toUpperCase()} • {code.length} characters
              </StatusItem>
              <StatusItem>
                Line {editorRef.current?.getPosition()?.lineNumber || 1}, Column {editorRef.current?.getPosition()?.column || 1}
              </StatusItem>
            </StatusBar>
            <KeyboardShortcuts>
              <div>Run: <ShortcutKey>Ctrl</ShortcutKey>+<ShortcutKey>Enter</ShortcutKey></div>
              <div>Submit: <ShortcutKey>Ctrl</ShortcutKey>+<ShortcutKey>Shift</ShortcutKey>+<ShortcutKey>Enter</ShortcutKey></div>
            </KeyboardShortcuts>
            <Editor
              height="100%"
              defaultLanguage={language}
              defaultValue={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', 'Consolas', monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                renderLineHighlight: 'all',
                padding: { top: 12, bottom: 12 },
                scrollbar: {
                  vertical: 'visible',
                  horizontal: 'visible',
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8
                },
                automaticLayout: true,
                fixedOverflowWidgets: true,
                wordWrap: 'on',
                formatOnPaste: true,
                formatOnType: true,
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: 'on',
                overviewRulerBorder: false,
                scrollBeyondLastColumn: 0,
                renderFinalNewline: true
              }}
              loading={<EditorLoading>Loading...</EditorLoading>}
              beforeMount={(monaco) => {
                monaco.editor.defineTheme('customDark', {
                  base: 'vs-dark',
                  inherit: true,
                  rules: [
                    { token: 'comment', foreground: '6272a4' },
                    { token: 'string', foreground: 'f1fa8c' },
                    { token: 'keyword', foreground: 'ff79c6', fontStyle: 'bold' },
                    { token: 'number', foreground: 'bd93f9' },
                    { token: 'operator', foreground: 'ff79c6' }
                  ],
                  colors: {
                    'editor.background': '#0A0F1A',
                    'editor.foreground': '#f8f8f2',
                    'editor.lineHighlightBackground': '#1F2937',
                    'editor.selectionBackground': '#374151',
                    'editor.inactiveSelectionBackground': '#374151',
                    'editorCursor.foreground': '#f8f8f2',
                    'editorLineNumber.foreground': '#6B7280',
                    'editorLineNumber.activeForeground': '#F9FAFB',
                    'editor.selectionHighlightBackground': '#374151',
                    'editor.wordHighlightBackground': '#374151',
                    'editor.wordHighlightStrongBackground': '#374151',
                    'editorBracketMatch.background': '#374151',
                    'editorBracketMatch.border': '#6366F1'
                  }
                });
              }}
            />
          </EditorContainer>

          {(testResults || submissionResults) && (
            <TestResults>
              <TestHeader>
                <TestTitle>
                  {submissionResults ? 'Submission Results' : 'Test Results'}
                </TestTitle>
                <TestSummary>
                  Passed: {(submissionResults || testResults).passed}/
                  {(submissionResults || testResults).total}
                </TestSummary>
              </TestHeader>
              <TestCases>
                {(submissionResults || testResults).cases.map((test, index) => (
                  <TestCase key={test.id} status={test.status} index={index}>
                    <TestCaseHeader>
                      <TestCaseTitle>Test Case {test.id}</TestCaseTitle>
                      <TestCaseStatus status={test.status}>
                        {test.status}
                      </TestCaseStatus>
                    </TestCaseHeader>
                    <TestCaseDetails>
                      <TestDetail>
                        <Label>Input:</Label>
                        <Value>{test.input}</Value>
                      </TestDetail>
                      <TestDetail>
                        <Label>Your Output:</Label>
                        <Value>{test.output}</Value>
                      </TestDetail>
                      <TestDetail>
                        <Label>Expected:</Label>
                        <Value>{test.expected}</Value>
                      </TestDetail>
                    </TestCaseDetails>
                  </TestCase>
                ))}
              </TestCases>
            </TestResults>
          )}
        </EditorSection>
      </Content>
      <FloatingActions>
        <FloatingButton onClick={() => window.scrollTo(0, 0)} title="Scroll to top">
          ↑
        </FloatingButton>
      </FloatingActions>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.background};
  background-image: 
    radial-gradient(circle at 0% 0%, ${({ theme }) => `${theme.primary}10`} 0%, transparent 40%),
    radial-gradient(circle at 100% 100%, ${({ theme }) => `${theme.secondary}10`} 0%, transparent 40%);
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  padding-top: 80px;
  position: relative;
  max-width: 2200px;
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - 80px);

  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 90px 20px 20px;
    gap: 24px;
  }
`;

const ProblemSection = styled.div`
  width: 40%;
  height: calc(100vh - 80px);
  overflow-y: auto;
  padding: 2rem;
  background: ${({ theme }) => theme.surface};
  border-right: 1px solid ${({ theme }) => `${theme.border}30`};
  position: fixed;
  left: 0;
  top: 80px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.primary}40`};
    border-radius: 2px;
  }

  @media (max-width: 1200px) {
    position: static;
    width: 100%;
    height: auto;
    border-right: none;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => `${theme.border}30`};
    margin-bottom: 1rem;
  }
`;

const QuestionHeader = styled.div`
  margin-bottom: 2.5rem;
  position: relative;
  padding: 1rem 0 1.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: ${({ theme }) => `linear-gradient(to right, ${theme.primary}50, transparent)`};
  }
`;

const QuestionTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  background: ${({ theme }) => theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => `${theme.background}50`};
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;

  svg {
    width: 18px;
    height: 18px;
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  &:hover {
    background: ${({ theme }) => `${theme.background}80`};
    color: ${({ theme }) => theme.text};
    transform: translateY(-1px);

    svg {
      opacity: 1;
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
  padding: 0.5rem 0;

  &:last-child {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: '';
    display: block;
    width: 4px;
    height: 1rem;
    background: ${({ theme }) => theme.gradient};
    border-radius: 2px;
  }
`;

const Description = styled.p`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin: 0;
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.codeBg};
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  color: ${({ theme }) => theme.text};
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  border: 1px solid ${({ theme }) => `${theme.border}30`};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "•";
    color: ${({ theme }) => theme.primary};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const EditorSection = styled.div`
  flex: 1;
  margin-left: 40%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.codeBg};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.gradient};
    opacity: 0.2;
  }

  @media (max-width: 1200px) {
    margin-left: 0;
    height: 600px;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid ${({ theme }) => `${theme.border}30`};
  }
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: ${({ theme }) => theme.surface};
  border-bottom: 1px solid ${({ theme }) => `${theme.border}30`};
  box-shadow: 0 1px 3px ${({ theme }) => `${theme.shadow}30`};
`;

const LanguageSelect = styled.select`
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}20`};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -0.5rem;
    bottom: -0.5rem;
    left: -1rem;
    width: 1px;
    background: ${({ theme }) => `${theme.border}30`};
  }
`;

const RunButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => `${theme.border}50`};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  background: ${({ theme }) => `linear-gradient(145deg, ${theme.surface}, ${theme.surfaceHover})`};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 10px ${({ theme }) => `${theme.primary}10`};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px ${({ theme }) => `${theme.primary}20`};
    border-color: ${({ theme }) => theme.primary};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(RunButton)`
  background: ${({ theme }) => theme.gradient};
  color: white;
  border: none;
  box-shadow: 0 2px 10px ${({ theme }) => `${theme.primary}20`};

  &:hover:not(:disabled) {
    box-shadow: 0 4px 20px ${({ theme }) => `${theme.primary}40`};
    opacity: 0.95;
  }
`;

const EditorContainer = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
  background: ${({ theme }) => theme.codeBg};
  overflow: hidden;
`;

const TestResults = styled.div`
  background: ${({ theme }) => theme.surface};
  border-top: 1px solid ${({ theme }) => `${theme.border}30`};
  padding: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
`;

const TestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const TestTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
`;

const TestSummary = styled.div`
  color: ${({ theme }) => theme.textSecondary};
`;

const TestCases = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TestCase = styled.div`
  background: ${({ theme }) => theme.codeBg};
  border-radius: 8px;
  padding: 1.25rem;
  border: 1px solid ${({ status, theme }) => 
    status === 'PASSED' ? `${theme.success}30` : `${theme.error}30`};
  margin-bottom: 1rem;
`;

const TestCaseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const TestCaseTitle = styled.h4`
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;

const TestCaseStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${({ status, theme }) => 
    status === 'PASSED' ? theme.success : theme.error};
  color: white;
`;

const TestCaseDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  background: ${({ theme }) => `${theme.background}50`};
  padding: 1rem;
  border-radius: 8px;
`;

const TestDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.text};
  font-size: 0.875rem;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const DifficultyBadge = styled.span`
  padding: 0.6rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  background: ${({ difficulty, theme }) => 
    difficulty === 'EASY' ? `linear-gradient(135deg, ${theme.success}20, ${theme.success}40)` :
    difficulty === 'MEDIUM' ? `linear-gradient(135deg, ${theme.warning}20, ${theme.warning}40)` :
    `linear-gradient(135deg, ${theme.error}20, ${theme.error}40)`};
  color: ${({ difficulty, theme }) => 
    difficulty === 'EASY' ? theme.success :
    difficulty === 'MEDIUM' ? theme.warning :
    theme.error};
  border: 1px solid ${({ difficulty, theme }) => 
    difficulty === 'EASY' ? `${theme.success}30` :
    difficulty === 'MEDIUM' ? `${theme.warning}30` :
    `${theme.error}30`};
  box-shadow: 0 4px 12px ${({ difficulty, theme }) => 
    difficulty === 'EASY' ? `${theme.success}20` :
    difficulty === 'MEDIUM' ? `${theme.warning}20` :
    `${theme.error}20`};
`;

const LoadingScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const ErrorScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.error};
`;

const ButtonTooltip = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.5rem;
  background: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.text};
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
  white-space: nowrap;
  
  ${RunButton}:hover & {
    opacity: 1;
  }
`;

const RunButtonWithTooltip = styled.div`
  position: relative;
  
  &:hover ${ButtonTooltip} {
    opacity: 1;
  }
`;

const FloatingActions = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
`;

const FloatingButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.gradient};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px ${({ theme }) => `${theme.primary}40`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme }) => `${theme.primary}60`};
  }
`;

const StatusBar = styled.div`
  background: ${({ theme }) => theme.surface};
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => `${theme.border}30`};
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const StatusItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const KeyboardShortcuts = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  padding: 0.75rem;
  background: ${({ theme }) => `${theme.surface}95`};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => `${theme.border}30`};
  backdrop-filter: blur(10px);
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  ${EditorContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ShortcutKey = styled.span`
  padding: 0.25rem 0.5rem;
  background: ${({ theme }) => `${theme.background}80`};
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  margin: 0 0.25rem;
`;

const EditorLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: ${({ theme }) => theme.codeBg};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

export default ProblemDetail; 