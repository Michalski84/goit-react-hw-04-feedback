import React, { useState } from 'react';
import styled from 'styled-components';
import Statistics from './components/Statistics';
import FeedbackOptions from './components/FeedbackOptions';
import Section from './components/Section';
import Notification from './components/Notification';

const AppContainer = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = type => {
    setFeedback(prevFeedback => ({ ...prevFeedback, [type]: prevFeedback[type] + 1 }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const { good } = feedback;
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div>
      <AppContainer>
        <Section title="Please leave feedback">
          <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleFeedback} />
        </Section>

        {totalFeedback > 0 ? (
          <Section title="Statistics">
            <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} total={totalFeedback} positivePercentage={positivePercentage} />
          </Section>
        ) : (
          <Notification message="There is no feedback" />
        )}
      </AppContainer>
    </div>
  );
};

export default App;
