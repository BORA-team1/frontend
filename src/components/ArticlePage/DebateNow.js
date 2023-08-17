import React from 'react';
import styled from 'styled-components';

const DebateNow = ({debate, BASE_URL}) => {
  return (
    <Container>
      <DebateContent>
        <Title>
          {'<'}
          {debate.title}
          {'>'}
        </Title>
        <Subtitle>
          <div>주제로</div>
          <Member>
            <img
              src={`${BASE_URL}${debate.debate_user.profile}`}
              alt='profile'
            />
            <div>{debate.debate_user.nickname}</div>
          </Member>
          <div>님이 토론을 주최했어요!</div>
        </Subtitle>
      </DebateContent>
      <EnterButton>참여하기</EnterButton>
    </Container>
  );
};

export default DebateNow;

const Container = styled.div`
  width: 326px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  flex-direction: column;
  align-items: center;
  gap: 1.83px;

  img {
    width: 27px;
    height: 27px;
    border-radius: 50%;
  }

  div {
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
