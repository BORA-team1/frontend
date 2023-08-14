import React from 'react';
import styled from 'styled-components';

const SentenceBox = ({lineContent}) => {
  return (
    <Container>
      <Sentence>“ {lineContent} ”</Sentence>
    </Container>
  );
};

export default SentenceBox;

const Container = styled.div`
  width: 390px;
  padding: 20px;
  box-sizing: border-box;
  background: var(--sub-background, #242237);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  border-bottom: 1px solid #353646;
`;

const Sentence = styled.div`
  color: #fff;
  font-size: 15px;
  font-weight: 400;
  line-height: 133.5%; /* 20.025px */
  letter-spacing: -0.3px;
`;
