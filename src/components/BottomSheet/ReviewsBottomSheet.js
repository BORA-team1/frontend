import React, {useState, useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import axios from 'axios';

import Review from '../ArticlePage/Review';
import submiticon from '../../images/submiticon.svg';

//context
import {useAuth} from '../../contexts/AuthContext';

const ReviewsBottomSheet = ({handleCloseBottomSheet, postPk}) => {
  const [render, setRender] = useState(1);

  // GET: 한마디
  const {authToken, BASE_URL} = useAuth();
  useEffect(() => {
    getReviews();
  }, [render]);

  const [reviews, setReviews] = useState([]);
  const getReviews = () => {
    axios
      .get(`${BASE_URL}han/${postPk}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setReviews(response.data.data.han);
        console.log(response.data.data.han);
      })
      .catch((error) => {
        console.error('한마디를 불러오는 중 오류가 발생했습니다.', error);
      });
  };

  //POST: 한마디
  const [review, setReview] = useState('');
  const handleReviewsSubmit = () => {
    if (review.trim() === '') return null;
    axios
      .post(
        `${BASE_URL}han/${postPk}/`,
        {content: review},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        setRender(render + 1);
        setReview('');
        console.log(response);
      })
      .catch((error) => {
        console.error('한마디를 등록하는 중 오류가 발생했습니다.', error);
      });
  };

  //Delete: 한마디 삭제
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}han/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        setRender(render + 1);
        console.log(response);
      })
      .catch((error) => {
        console.error('한마디를 삭제하는 중 오류가 발생했습니다.', error);
      });
  };

  return (
    <BottomSheetOverlay>
      <BottomSheetContainer onClick={(e) => e.stopPropagation()}>
        <BottomSheetHeader>
          <HeaderText>
            <CloseBottomSheet onClick={handleCloseBottomSheet}>
              닫기
            </CloseBottomSheet>
            <span>한마디</span>
          </HeaderText>
          <HR></HR>
        </BottomSheetHeader>

        <ReviewContatiner>
          <ReviewsTop>
            {reviews && reviews.length > 0 ? (
              <div>한마디 {reviews.length}개</div>
            ) : (
              <div>한마디가 없습니다.</div>
            )}
          </ReviewsTop>
          <List>
            {reviews &&
              reviews.map((review) => (
                <Review
                  key={review.han_id}
                  reviewId={review.han_id}
                  reviewContent={review.content}
                  author={review.han_user.nickname}
                  like={review.like_num}
                  doLIke={review.do_like}
                  handleDelete={handleDelete}
                  replies={review.HanCom}
                  render={render}
                  setRender={setRender}
                ></Review>
              ))}
          </List>
        </ReviewContatiner>
        <InputBoxPosition>
          <Inputbox
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder='나의 한마디를 남겨 보세요.'
          ></Inputbox>
          <img
            onClick={handleReviewsSubmit}
            src={submiticon}
            alt='submiticon'
          ></img>
        </InputBoxPosition>
      </BottomSheetContainer>
    </BottomSheetOverlay>
  );
};

export default ReviewsBottomSheet;

const slideInAnimation = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const BottomSheetOverlay = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 390px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const BottomSheetContainer = styled.div`
  width: 100%;
  height: 780px;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 0 1px #353646 inset;
  background: var(--background, #161524);
  overflow-y: auto;
  font-family: 'Pretendard-Regular';
  font-style: normal;

  &::-webkit-scrollbar {
    display: none;
  }

  animation: ${slideInAnimation} 0.3s ease-out;
`;

const BottomSheetHeader = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;

  font-size: 15px;
  line-height: 100%; /* 15px */
  letter-spacing: -0.3px;

  background: var(--background, #161524);
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px 20px;

  span {
    color: #fff;
    font-weight: 600;
  }
`;

const CloseBottomSheet = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  margin-right: 129px;
  cursor: pointer;
`;

const ReviewContatiner = styled.div`
  margin-top: 75px;
  margin-bottom: 77px;
  width: 390px;
  display: flex;
  flex-direction: column;
`;

const ReviewsTop = styled.div`
  margin: 20px 21px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.24px;
`;

const List = styled.div`
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const HR = styled.div`
  width: 390px;
  height: 5px;
  background: #353646;
`;

const InputBoxPosition = styled.div`
  width: 390px;
  padding: 21px 20px;
  box-sizing: border-box;
  border-top: 1px solid #353646;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #161524;
  gap: 6px;

  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;

const Inputbox = styled.input`
  width: 309px;
  height: 35px;
  border-radius: 20px;
  border: none;
  outline: none;
  box-shadow: 0 0 0 1px #fff inset;
  background-color: #161524;
  padding-left: 10px;

  color: white;
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;
