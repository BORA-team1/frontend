import React, {useContext, useState} from 'react';
import {SheetContext} from '../../contexts/SheetContext';
import styled from 'styled-components';
import axios from 'axios';

import Reply from '../BottomSheet/Reply';

//images
import profile from '../../images/profile.svg';
import thumbsup from '../../images/thumbsup.svg';
import thumbsupclick from '../../images/thumbsupclick.svg';
import submiticon from '../../images/submiticon.svg';

//context
import {useAuth} from '../../contexts/AuthContext';

const Review = ({
  reviewId,
  reviewContent,
  author,
  profile,
  like,
  doLIke,
  handleDelete,
  replies,
  render,
  setRender,
}) => {
  //POST: 한마디 답글
  const {authToken, BASE_URL, nickname} = useAuth();
  const [replyText, setReplyText] = useState('');
  const handleReplyClick = () => {
    if (replyText.trim() === '') return null;
    axios
      .post(
        `${BASE_URL}han/com/${reviewId}/`,
        {content: replyText, mention: mentionedUser},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setRender(render + 1);
        setReplyText('');
        setShowReplyForm(false);
        console.log(response);
      })
      .catch((error) => {
        console.error(
          '한마디의 답글을 등록하는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  const handleReply = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      handleReplyClick();
    }
  };

  //Delete: 한마디 답글 삭제
  const handleReplyDelete = (replyId) => {
    axios
      .delete(`${BASE_URL}han/com/del/${replyId}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('한마디의 답글 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  //답글 입력창 관리, 언급할 사용자 설정
  const bottomSheetOpen = useContext(SheetContext);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [mentionedUser, setMentionedUser] = useState('');
  const handleButtonClick = (author) => {
    if (bottomSheetOpen) {
      setShowReplyForm(!showReplyForm);
      setMentionedUser(author);
    }
  };

  //POST: 추천 여부 변경
  const [clickIcon, setClickIcon] = useState(doLIke);
  const handleClickIcon = () => {
    axios
      .post(`${BASE_URL}han/like/${reviewId}/`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setClickIcon(!clickIcon);
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error(
          '한마디의 좋아요 여부를 변경하는 중 오류가 발생했습니다.',
          error
        );
      });
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <img src={`${BASE_URL}${profile}`} alt='profileimg'></img>
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
              {like}
            </div>
            <span
              style={{
                color: clickIcon ? '#A397FF' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              ·
            </span>
            {clickIcon ? (
              <div
                onClick={handleClickIcon}
                style={{
                  color: '#A397FF',
                }}
              >
                추천 취소
              </div>
            ) : (
              <div onClick={handleClickIcon}>추천해요</div>
            )}
            <span>·</span>
            <div onClick={() => handleButtonClick(author)}>답글달기</div>
            {author === nickname && (
              <>
                <span>·</span>
                <div onClick={() => handleDelete(reviewId)}>삭제</div>
              </>
            )}
          </Plus>
        </ContentContainer>
      </Container>
      {replies &&
        replies.map((reply) => (
          <Reply
            key={reply.hancom_id}
            replyId={reply.hancom_id}
            mention={reply.mention}
            content={reply.content}
            author={reply.hancom_user.nickname}
            profile={reply.hancom_user.profile}
            showReplyForm={showReplyForm}
            setShowReplyForm={setShowReplyForm}
            setMention={setMentionedUser}
            handleReplyDelete={handleReplyDelete}
            nickname={nickname}
            BASE_URL={BASE_URL}
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
                onKeyDown={(e) => handleReply(e)}
              ></input>
            </Inputbox>
            <img
              onClick={() => handleReplyClick()}
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
    width: 44px;
    height: 44px;
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

  span {
    color: rgba(255, 255, 255, 0.7);
    padding-top: 0px;
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
