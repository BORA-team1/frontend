import React from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';

const Reply = ({reply, showReplyForm, setShowReplyForm, setMention}) => {
  return (
    <>
      <Container>
        <ProfileContainer>
          <img src={profile} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>{reply.author}</Id>
          <Content>
            <span>@{reply.mention}</span> {''}
            {reply.content}
          </Content>
          <Plus>
            <div
              onClick={() => {
                setShowReplyForm(!showReplyForm);
                setMention(reply.author);
              }}
            >
              답글달기
            </div>
            <span>·</span>
            <div>삭제</div>
          </Plus>
        </ContentContainer>
      </Container>
    </>
  );
};

export default Reply;

const Container = styled.div`
  width: 296px;
  display: flex;
  flex-direction: row;
  padding: 15px;
  box-sizing: border-box;
  margin-left: 53px;

  border-radius: 10px;
  background: var(--sub-background, #242237);
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
`;

const Id = styled.div`
  color: white;

  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Content = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  color: white;
  font-size: 12px;
  font-weight: 500;
  line-height: 125%;

  span {
    color: var(--sub-purple, #a397ff);
  }
`;

const Plus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;

  color: rgba(255, 255, 255, 0.7);
  font-size: 10px;
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
