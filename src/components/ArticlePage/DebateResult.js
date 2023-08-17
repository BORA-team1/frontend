import React from 'react';
import styled from 'styled-components';

const DebateResult = ({doneDebate, BASE_URL}) => {
  return (
    <Box>
      <Title>
        {'<'}
        {doneDebate.title}
        {'>'}
      </Title>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '350px',
        }}
      >
        <TagBox>
          <People>만든 이</People>
          <UserIcon>
            <img src={`${doneDebate.debate_user.profile}`} />
            <div>{doneDebate.debate_user.nickname}</div>
          </UserIcon>
        </TagBox>
        <BtnContainer>
          <EndBtn>토론종료</EndBtn>
        </BtnContainer>
      </div>
    </Box>
  );
};

export default DebateResult;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 350px;
  height: 64.7px;
`;

const Font = styled.div`
  color: #fff;
  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const Title = styled(Font)`
  width: 350px;
  height: 23px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14.989px;
  font-weight: 400;

  margin-bottom: 5px;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const UserIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.83px;

  img {
    width: 26.9px;
    height: 26.9px;
    border-radius: 50%;
  }

  div {
    font-size: 6.113px;
    font-weight: 600;
    line-height: normal;
  }
`;

const People = styled(Font)`
  font-size: 12px;
  font-weight: 600;
  margin-right: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const EndBtn = styled(Font)`
  display: flex;
  align-items: flex-start;
  padding: 7px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);

  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;
