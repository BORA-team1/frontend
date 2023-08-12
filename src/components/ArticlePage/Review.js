import React, {useContext, useState} from 'react';
import {SheetContext} from '../../contexts/SheetContext';
import styled from 'styled-components';
import Reply from '../BottomSheet/Reply';
import profile from '../../images/profile.svg';
import thumbsup from '../../images/thumbsup.svg';
import thumbsupclick from '../../images/thumbsupclick.svg';
import submiticon from '../../images/submiticon.svg';
// import ReplyForm from '../BottomSheet/ReplyForm';

const Review = ({
  replies,
  reviewContent,
  reviewId,
  author,
  handleDelete,
  addReply,
  mentionedUser,
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

  const handleReplyClick = () => {
    addReply(reviewId, replyText, author);
    setReplyText('');
    setShowReplyForm(false);
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
        <>
          <Mention>{mentionedUser} 님에게 답글</Mention>
          <InputBoxPosition>
            <Inputbox>
              <div>@{mentionedUser}</div>
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => handleReply(e, author)}
              ></input>
            </Inputbox>
            <img
              onClick={() => handleReplyClick(author)}
              src={submiticon}
              alt='submiticon'
            ></img>
          </InputBoxPosition>
        </>
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

const InputBoxPosition = styled.div`
  z-index: 2;
  width: 350px;
  height: 83px;
  padding: 21px 0px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #161524;
  gap: 6px;

  font-family: 'Pretendard-Regular';
  font-style: normal;

  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }

  div {
    display: flex;
    flex-direction: row;
  }
`;

const Mention = styled.div`
  position: absolute;
  bottom: 83px;
  left: 0;
  display: flex;
  align-items: center;
  width: 350px;
  padding: 0px 20px;
  height: 32px;
  background: #242237;

  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
`;

const Inputbox = styled.div`
  width: 309px;
  height: 35px;
  border-radius: 20px;
  box-shadow: 0 0 0 1px #fff inset;
  background-color: #161524;
  display: flex;
  align-items: center;

  font-size: 12px;
  font-weight: 500;
  line-height: normal;

  div {
    padding-left: 10px;
    width: auto;
    color: #a397ff;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    flex: 1;
    padding-left: 10px;
    color: white;

    font-family: 'Pretendard-Regular';
    font-style: normal;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
  }
`;
