import React from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';

const VoteBox = () => {
  return (
    <Container>
      <Header>
        <ProfileContainer>
          <img src={profile} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>broaden_horizons</Id>
          <Content>이거 나.. 일부러 제로콜라만 먹었는데ㅠ</Content>
        </ContentContainer>
      </Header>
      <List>
        <div>아직 그냥 사먹는다.</div>
        <div>아직 그냥 사먹는다.</div>
        <div>아직 그냥 사먹는다.</div>
      </List>
      <VoteEnd>투표 종료하기</VoteEnd>
    </Container>
  );
};

export default VoteBox;

const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  color: white;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 17px;
`;

const ProfileContainer = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 50%;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  width: 296px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Id = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  margin-top: 5px;
  font-size: 14.989px;
  font-weight: 400;
  line-height: 135.836%;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 23px;

  div {
    width: 350px;
    border-radius: 10px;
    background: #6a6881;
    border: none;
    outline: none;
    padding: 16px 20px 16px 20px;
    box-sizing: border-box;
    font-size: 13px;
    font-weight: 600;
    line-height: 136.5%; /* 17.745px */
    letter-spacing: -0.26px;
  }
`;

const VoteEnd = styled.div`
  padding: 7px 14px;
  width: fit-content;
  margin-top: 30px;
  border-radius: 20px;
  border: 1.2px solid #fff;
  backdrop-filter: blur(5px);
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
`;
