import React from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';
import thumbsup from '../../images/thumbsup.svg';

const CommentBox = () => {
  return (
    <Container>
      <ProfileContainer>
        <img src={profile} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>broaden_horizons</Id>
        <Content>이거 나.. 일부러 제로콜라만 먹었는데ㅠ</Content>
        <Plus>
          <img src={thumbsup} alt='thumbsup'></img>
          <div>좋아요</div>
          <span>·</span>
          <div>답글달기</div>
        </Plus>
      </ContentContainer>
    </Container>
  );
};

export default CommentBox;

const Container = styled.div`
  width: 350px;
  margin-left: 20px;
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
