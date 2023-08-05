import React from 'react';
import styled from 'styled-components';

const VoteNow = () => {
  return (
    <Container>
      <DebateContent>
        <Title>
          {'<'}수능이 기초학력평가용으로 바뀌어야 한다고 생각하시나요?{'>'}
        </Title>
        <Subtitle>
          <div>주제로</div>
          <Member>
            <div>
              <img></img>
              <span>04jjk</span>
            </div>
          </Member>
          <div>님이 생성한 투표 진행 중!</div>
        </Subtitle>
      </DebateContent>
      <EnterButton>투표하기</EnterButton>
    </Container>
  );
};

export default VoteNow;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  gap: 13px;
`;

const DebateContent = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 151.336%;
  color: #fff;
  gap: 3px;
`;

const Title = styled.div`
  max-width: 236px;
  font-size: 14.989px;
  font-weight: 400;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
`;

const Member = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 5px;

  div {
    margin-left: -5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.83px;
  }

  div > img {
    width: 27px;
    height: 27px;
    border-radius: 13.5px;
  }

  div > span {
    font-size: 6px; //사이즈 오류?
    line-height: normal;
  }
`;

const EnterButton = styled.div`
  font-family: 'Pretendard-Regular';
  padding: 7px 14px;
  width: 77px;
  height: 31px;
  box-sizing: border-box;
  border-radius: 20px;
  background: #fff;
  color: #1a1920;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
`;