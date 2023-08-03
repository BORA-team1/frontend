import React from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';
import thumbsup from '../../images/thumbsup.svg';

const Review = () => {
  return (
    <Container>
      <ProfileContainer>
        <img src={profile} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>zimmmni</Id>
        <Content>
          결국 아스파탐이 발암 가능 물질에 포함됐다고 하네요..! 😂 알룰로스는
          천연감미료라 그쪽으로 관심이 쏠리고 있다는데 이거에 대해서도 팩트체크
          해주시면 좋을거 같아요!
        </Content>
        <Plus>
          <img src={thumbsup} alt='thumbsup'></img>
          <div>추천해요</div>
          <span>·</span>
          <div>답글달기</div>
        </Plus>
      </ContentContainer>
    </Container>
  );
};

export default Review;

const Container = styled.div`
  width: 350px;
  margin-left: 20px;
  height: 92px;
  display: flex;
  flex-direction: row;
`;

const ProfileContainer = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;

  img {
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ContentContainer = styled.div`
  width: 296px;
  height: 92px;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const Id = styled.div`
  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
`;

const Plus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;

  color: rgba(255, 255, 255, 0.7);
  font-family: 'Pretendard-Regular';
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  img {
    width: 9px;
    height: 9.212px;
    cursor: pointer;
  }

  div {
    cursor: pointer;
  }
`;
