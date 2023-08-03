import React from 'react';
import styled from 'styled-components';
import QnABox from './QnABox';

const QnAList = ({expanded}) => {
  return (
    <Container>
      <Num>질문 1개</Num>
      {expanded ? (
        <List expanded={expanded}>
          <QnABox></QnABox>
          <QnABox></QnABox>
          <QnABox></QnABox>
        </List>
      ) : (
        <List expanded={expanded}>
          <QnABox></QnABox>
          <Box1></Box1>
          <Box2></Box2>
        </List>
      )}
    </Container>
  );
};

export default QnAList;

const Container = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const Num = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 133.5%; /* 16.02px */
  letter-spacing: -0.24px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: ${(props) => (props.expanded ? '25px' : '0px')};
`;

const Box1 = styled.div`
  width: 272px;
  height: 8px;
  box-sizing: border-box;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  border-top: 0px;
  background: var(--card-color, #2b2c3f);
`;

const Box2 = styled.div`
  width: 250px;
  height: 8px;
  box-sizing: border-box;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  border-top: 0px;
  background: var(--card-color, #2b2c3f);
`;
