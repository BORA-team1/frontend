import React, {useContext, useState} from 'react';
import {SheetContext} from '../../contexts/SheetContext';
import styled from 'styled-components';
import Reply from '../BottomSheet/Reply';
import profile from '../../images/profile.svg';
import thumbsup from '../../images/thumbsup.svg';
import thumbsupclick from '../../images/thumbsupclick.svg';
import ReplyForm from '../BottomSheet/ReplyForm';

const Review = ({
  replies,
  reviewContent,
  reviewId,
  author,
  handleDelete,
  addReply,
  setMention,
}) => {
  //추천해요/추천취소
  const [clickIcon, setClickIcon] = useState(false);
  const handleClickIcon = () => {
    setClickIcon(!clickIcon);
  };

  //답글 등록
  const [replyText, setReplyText] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();

      addReply(reviewId, replyText, author);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const bottomSheetOpen = useContext(SheetContext);
  //답글 입력창 관리
  const handleButtonClick = (author) => {
    if (bottomSheetOpen) {
      setShowReplyForm(!showReplyForm);
      setMention(author);
    }
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <img src={profile} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>{author}</Id>
          <Content>{reviewContent}</Content>
          <Plus>
            {clickIcon ? (
              <img
                src={thumbsupclick}
                alt='thumbsup'
                onClick={handleClickIcon}
              ></img>
            ) : (
              <img
                src={thumbsup}
                alt='thumbsup'
                onClick={handleClickIcon}
              ></img>
            )}

            <div
              style={{
                color: clickIcon ? '#A397FF' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              0
            </div>
            <span>·</span>
            {clickIcon ? (
              <div onClick={handleClickIcon}>추천 취소</div>
            ) : (
              <div onClick={handleClickIcon}>추천해요</div>
            )}
            <span>·</span>
            <div onClick={() => handleButtonClick(author)}>답글달기</div>
            <span>·</span>
            <div onClick={() => handleDelete(reviewId)}>삭제</div>
          </Plus>
        </ContentContainer>
      </Container>
      {replies &&
        replies.map((reply) => (
          <Reply
            key={reply.id}
            reply={reply}
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
            setMention={setMention}
          ></Reply>
        ))}
      {showReplyForm && (
        <ReplyForm
          replyText={replyText}
          setReplyText={setReplyText}
          handleReply={handleReply}
          mentionedUser={author}
        ></ReplyForm>
      )}
    </>
  );
};

export default Review;

const Container = styled.div`
  width: 350px;
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
