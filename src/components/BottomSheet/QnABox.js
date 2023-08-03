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
  width: 302px;
  padding: 25px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;

  border-radius: 10px;
  border: 1px solid var(--unnamed, #353646);
  background: var(--card-color, #2b2c3f);
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
  font-size: 14px;
  font-style: normal;
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
