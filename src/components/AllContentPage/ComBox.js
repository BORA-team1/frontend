import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

import heart from '../../images/heart.svg';
import heartclick from '../../images/heartclick.svg';

const ComBox = ({
  comment,
  BASE_URL,
  authToken,
  nickname,
  render,
  setRender,
}) => {
  //Delete: 댓글 삭제
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}line/com/del/${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error('한마디를 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  //좋아요/좋아요취소
  const [clickIcon, setClickIcon] = useState(comment.do_like);

  //POST: 좋아요
  const handleLIkeClick = () => {
    axios
      .post(`${BASE_URL}line/com/like/${comment.linecom_id}/`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log('밑줄 댓글을 좋아요했습니다.', response);
        setRender(render + 1);
        setClickIcon(!clickIcon);
      })
      .catch((error) => {
        console.error('밑줄 댓글 좋아요 중 오류가 발생했습니다.', error);
      });
  };

  //DELETE: 좋아요 취소
  const handleLIkeDelete = () => {
    axios
      .patch(`${BASE_URL}line/com/like/${comment.linecom_id}/`, null, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log('밑줄 댓글을 좋아요 취소했습니다.', response);
        setRender(render + 1);
        setClickIcon(!clickIcon);
      })
      .catch((error) => {
        console.error('밑줄 댓글 좋아요 취소 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <Container>
      <ProfileContainer>
        <img src={`${comment.linecom_user.profile}`} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>{comment.linecom_user.nickname}</Id>
        <Content>{comment.content}</Content>
        <Plus>
          {clickIcon ? (
            <img
              src={heartclick}
              alt='heartclick'
              onClick={handleLIkeDelete}
            ></img>
          ) : (
            <img src={heart} alt='heart' onClick={handleLIkeClick}></img>
          )}
          <div
            style={{
              color: clickIcon ? '#A397FF' : 'rgba(255, 255, 255, 0.7)',
            }}
          >
            {comment.likenum}
          </div>
          {clickIcon ? (
            <div
              onClick={handleLIkeDelete}
              style={{
                color: clickIcon ? '#A397FF' : 'rgba(255, 255, 255, 0.7)',
              }}
            >
              좋아요 취소
            </div>
          ) : (
            <div onClick={handleLIkeClick}>좋아요</div>
          )}

          {comment.linecom_user.nickname === nickname && (
            <>
              <span>·</span>
              <div onClick={() => handleDelete(comment.linecom_id)}>삭제</div>
            </>
          )}
        </Plus>
      </ContentContainer>
    </Container>
  );
};

export default ComBox;

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
