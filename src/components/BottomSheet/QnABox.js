import React from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';

const QnABox = () => {
  return (
    <Container>
      <ProfileContainer>
        <img src={profile} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>broaden_horizons</Id>
        <Content>
          그럼 제로슈거 음료에는 다 아스파탐이 들어가는 건가요? 다른 성분의
          대체당은 아스파탐만큼 보편적이지 않은 것인지 궁금합니다!
        </Content>
        <Plus>
          <div>답변 0개</div>
          <span>·</span>
          <div>삭제</div>
        </Plus>
      </ContentContainer>
    </Container>
  );
};

export default QnABox;

const Container = styled.div`
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
  font-family: 'Pretendard-Regular';
  font-style: normal;
  line-height: normal;
`;

const Id = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

const Content = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  color: white;
  font-size: 14px;
  font-weight: 400;
  line-height: 139.336%;
`;

const Plus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;

  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
  font-weight: 500;

  img {
    width: 9px;
    height: 9.212px;
    cursor: pointer;
  }

  div {
    cursor: pointer;
  }
`;
