import React from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';

const QnABox = ({comment}) => {
  return (
    <Container>
      <ProfileContainer>
        <img src={profile} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>broaden_horizons</Id>
        <Content>{comment.content}</Content>
        {comment.que_id && (
          <Plus>
            <div>답변 {comment.answers.length}개</div>
            {/* 이 질문이 내 질문이고 답변이 달리지 않았을 때만 삭제 허용 */}
            {comment.is_my && comment.answers.length === 0 && (
              <>
                <span>·</span>
                <div>삭제</div>
              </>
            )}
          </Plus>
        )}
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
