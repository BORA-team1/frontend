import React from 'react';
import styled from 'styled-components';

const QBox = ({question}) => {
  return (
    <Container>
      <ProfileContainer>
        <img src={`${question.que_user.profile}`} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>{question.que_user.nickname}</Id>
        <Content>{question.content}</Content>
        {question.Answer && (
          <Plus>
            <div>답변 {question.Answer.length}개</div>
          </Plus>
        )}
      </ContentContainer>
    </Container>
  );
};

export default QBox;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 269px;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 0.891px solid #382d8c;
  gap: 7px;
`;

const ProfileContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;

  img {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  width: 185px;
  display: flex;
  flex-direction: column;
  gap: 4.454px;
  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const Id = styled.div`
  font-size: 11px;
  color: white;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 400;
  line-height: 139.336%;
`;

const Plus = styled.div`
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  font-size: 11px;
  font-weight: 600;
  line-height: 133.5%;
`;
