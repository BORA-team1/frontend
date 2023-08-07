import React, {useState} from 'react';
import styled from 'styled-components';
import profile from '../../images/profile.svg';
import thumbsup from '../../images/thumbsup.svg';
import thumbsupclick from '../../images/thumbsupclick.svg';

const Review = ({review, handleDelete, reviewId}) => {
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
        <Id>zimmmni</Id>
        <Content>{review}</Content>
        <Plus>
          {clickIcon ? (
            <img
              src={thumbsupclick}
              alt='thumbsup'
              onClick={handleClickIcon}
            ></img>
          ) : (
            <img src={thumbsup} alt='thumbsup' onClick={handleClickIcon}></img>
          )}

          <div
            style={{
              color: clickIcon ? '#A397FF' : 'rgba(255, 255, 255, 0.7)',
            }}
          >
            6
          </div>
          <span>·</span>
          {clickIcon ? (
            <div onClick={handleClickIcon}>추천 취소</div>
          ) : (
            <div onClick={handleClickIcon}>추천해요</div>
          )}
          <span>·</span>
          <div>답글달기</div>
          <span>·</span>
          <div onClick={() => handleDelete(reviewId)}>삭제</div>
        </Plus>
      </ContentContainer>
    </Container>
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
