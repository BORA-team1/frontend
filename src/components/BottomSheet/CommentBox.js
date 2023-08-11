import React, {useState} from 'react';
import styled from 'styled-components';
import Reply from '../BottomSheet/Reply';
import ReplyForm from '../BottomSheet/ReplyForm';
import profile from '../../images/profile.svg';
import heart from '../../images/heart.svg';
import heartclick from '../../images/heartclick.svg';

const CommentBox = ({
  commentContent,
  commentId,
  author,
  replies,
  handleCommentDelete,
  addReply,
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
