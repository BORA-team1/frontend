import React from 'react';
import styled from 'styled-components';

const SentenceBox = () => {
  return (
    <Container>
      <Sentence>
        “ 혹시 요즘 아스파탐 논란 보고 혹시 요즘 아스파탐 논란 보고 ‘제로슈거
        음료 안 마시는 게 낫나?’ 고민한 사람 있나요? ”
      </Sentence>
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
