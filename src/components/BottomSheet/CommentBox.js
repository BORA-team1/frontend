import React, {useState} from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';
import heart from '../../images/heart.svg';
import heartclick from '../../images/heartclick.svg';

const CommentBox = ({commentCt, commentId, handleCommentDelete}) => {
  const [clickIcon, setClickIcon] = useState(false);

  const handleClickIcon = () => {
    setClickIcon(!clickIcon);
  };

  return (
    <Container>
      <ProfileContainer>
        <img src={profile} alt='profileimg'></img>
      </ProfileContainer>
      <ContentContainer>
        <Id>broaden_horizons</Id>
        <Content>{commentCt}</Content>
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
          <div>답글달기</div>
          {/* user가 누구인지에 따라 삭제 버튼 온오프 */}
          <span>·</span>
          <div onClick={() => handleCommentDelete(commentId)}>삭제</div>
        </Plus>
      </ContentContainer>
    </Container>
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
