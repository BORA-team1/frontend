import React from 'react';
import styled from 'styled-components';

const MySentenceBox = () => {
  return (
    <Container>
      <Sentence>
        “ 혹시 요즘 아스파탐 논란 보고 혹시 요즘 아스파탐 논란 보고 ‘제로슈거
        음료 안 마시는 게 낫나?’ 고민한 사람 있나요? ”
      </Sentence>
      <SelectButton>
        <span>삭제</span>
      </SelectButton>
    </Container>
  );
};

export default MySentenceBox;

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

const SelectButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 500;
  line-height: normal;
  text-decoration-line: underline;

  span {
    cursor: pointer;
  }
`;
