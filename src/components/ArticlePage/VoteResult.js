import React from 'react';
import styled from 'styled-components';
import Pie from './Pie';

const VoteResult = () => {
  return (
    <Container>
      <Title>
        정말 학교 수업만 듣고 수능을 잘 보는게 가능하다고 생각하시나요?
      </Title>
      <Age>
        <div>10대</div>
        <div>20대</div>
        <div>30대</div>
        <div>40대</div>
        <div>50대</div>
      </Age>
      <Result>
        <Percent>
          <div
            style={{
              color: '#2B99FF',
            }}
          >
            68.9%
          </div>
          <div
            style={{
              color: '#FFDD2B',
            }}
          >
            17.5%
          </div>
          <div
            style={{
              color: '#FF5E2B',
            }}
          >
            13.6%
          </div>
        </Percent>
        <List>
          <span>가능하다</span>
          <span>잘 모르겠다.</span>
          <span>절대 불가능하다.</span>
        </List>
        <Pie></Pie>
      </Result>
      <Plus>
        <div>2023.07.03 ~ 2023.07.09 · 총 197명</div>
        <div>
          제작 <span>loy_soy</span>
        </div>
      </Plus>
    </Container>
  );
};

export default VoteResult;

const Container = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const Title = styled.div`
  color: #fff;
  font-size: 14.989px;
  font-weight: 400;
  line-height: 151.336%;
`;

const Age = styled.div`
  margin-top: 8.43px;
  margin-bottom: 25.21px;
  display: flex;
  flex-direction: row;
  gap: 3.93px;

  div {
    color: rgba(255, 255, 255, 0.5);
    font-size: 9.504px;
    font-weight: 600;
    line-height: normal;
    padding: 4.752px 9.504px;
    border-radius: 13.578px;
    border: 0.679px solid rgba(255, 255, 255, 0.5);
  }
`;

const Result = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14.989px;
  font-weight: 600;
  line-height: 151.336%;
`;

const Percent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.61px;
`;

const List = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  margin-left: 16.32px;
  gap: 4.61px;

  color: #fff;
`;

const Plus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 24.33px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 8.678px;
  font-weight: 600;
  line-height: 151.336%; /* 13.133px */

  div > span {
    color: #fff;
  }
`;
