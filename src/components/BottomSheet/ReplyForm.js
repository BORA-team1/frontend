import React from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';

const ReplyForm = ({replyText, setReplyText, handleReply, mentionedUser}) => {
  return (
    <Container>
      <ProfileContainer>
        <img src={profile} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>zimmmni</Id>
        <Content
          rows='3'
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => handleReply(e, mentionedUser)}
        ></Content>
      </ContentContainer>
    </Container>
  );
};

export default ReplyForm;

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

const Content = styled.textarea`
  margin-top: 5px;
  margin-bottom: 10px;
  color: white;
  font-family: 'Pretendard-Regular';
  font-style: normal;
  font-size: 12px;
  font-weight: 500;
  line-height: 125%;
  background: none;
`;
