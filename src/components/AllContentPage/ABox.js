import React from 'react';
import styled from 'styled-components';

const ABox = ({answer}) => {
  return (
    <Container>
      <ProfileContainer>
        <img src={`${answer.ans_user.profile}`} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>{answer.ans_user.nickname}</Id>
        <Content>{answer.content}</Content>
      </ContentContainer>
    </Container>
  );
};

export default ABox;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 269px;
  padding: 18px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 0.891px solid var(--unnamed, #353646);
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
