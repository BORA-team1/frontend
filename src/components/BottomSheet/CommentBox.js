import React, {useState} from 'react';
import styled from 'styled-components';
import Reply from '../BottomSheet/Reply';
import profile from '../../images/profile.svg';
import heart from '../../images/heart.svg';
import heartclick from '../../images/heartclick.svg';
import submiticon from '../../images/submiticon.svg';

const CommentBox = ({
  commentContent,
  commentId,
  author,
  replies,
  handleCommentDelete,
  addReply,
  mentionedUser,
  setMention,
}) => {
  //좋아요/좋아요취소
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

      addReply(commentId, replyText, author);
      setReplyText('');
      setShowReplyForm(false);
    }
  };

  const handleReplyClick = () => {
    addReply(commentId, replyText, author);
    setReplyText('');
    setShowReplyForm(false);
  };

  //답글 입력창 관리
  const handleButtonClick = (author) => {
    setShowReplyForm(!showReplyForm);
    setMention(author);
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <img src={profile} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>{author}</Id>
          <Content>{commentContent}</Content>
          <Plus>
            {clickIcon ? (
              <img
                src={heartclick}
                alt='heartclick'
                onClick={handleClickIcon}
              ></img>
            ) : (
              <img src={heart} alt='heart' onClick={handleClickIcon}></img>
            )}
            <div
              style={{
                color: clickIcon ? '#A397FF' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              0
            </div>
            {clickIcon ? (
              <div onClick={handleClickIcon}>좋아요 취소</div>
            ) : (
              <div onClick={handleClickIcon}>좋아요</div>
            )}
            <span>·</span>
            <div onClick={() => handleButtonClick(author)}>답글달기</div>
            {/* user가 누구인지에 따라 삭제 버튼 온오프 */}
            <span>·</span>
            <div onClick={() => handleCommentDelete(commentId)}>삭제</div>
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

export default CommentBox;

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
