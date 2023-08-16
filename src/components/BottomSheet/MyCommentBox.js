import React, {useState} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//images
import profile from '../../images/profile.svg';
import heart from '../../images/heart.svg';
import heartclick from '../../images/heartclick.svg';

//context
import {useAuth} from '../../contexts/AuthContext';

const MyCommentBox = ({
  comId,
  comContent,
  user,
  mention,
  render,
  setRender,
}) => {
  //좋아요/좋아요취소
  const [clickIcon, setClickIcon] = useState(false);
  const handleClickIcon = () => {
    setClickIcon(!clickIcon);
  };

  //Delete: 내 댓글 삭제
  const {authToken, BASE_URL} = useAuth();
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}line/com/del/${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('문장의 댓글을 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  //Delete: 댓글 답글 삭제
  const handleReplyDelete = (replyId) => {
    axios
      .delete(`${BASE_URL}line/comcomdelete/${replyId}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('댓글의 답글 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <img src={profile} alt='profileimg'></img>
        </ProfileContainer>
        <ContentContainer>
          <Id>{user}</Id>
          {mention ? (
            <Content>
              <span>@{mention} </span>
              {comContent}
            </Content>
          ) : (
            <Content>{comContent}</Content>
          )}

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
            {mention ? (
              <div onClick={() => handleReplyDelete(comId)}>삭제</div>
            ) : (
              <div onClick={() => handleDelete(comId)}>삭제</div>
            )}
          </Plus>
        </ContentContainer>
      </Container>
    </>
  );
};

export default MyCommentBox;

const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  padding: 20px;
  border-bottom: 1px solid #353646;
  background: #1e1c2e;
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

  span {
    color: #a397ff;
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
