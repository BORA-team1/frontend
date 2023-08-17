import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';

//images
import more from '../../images/more.svg';
import Review from '../ArticlePage/Review';
import submiticon from '../../images/submiticon.svg';

//context
import {useAuth} from '../../contexts/AuthContext';

const ArticleReview = ({handleBottomSheet, postPk}) => {
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
    <>
      <ArticleReviewContainer>
        <HR></HR>
        <ReviewTop>
          <div>한마디 {reviews.length}개</div>
          <MoreReview id='review' onClick={handleBottomSheet}>
            다른 한마디 더보기<img src={more} alt='morereview'></img>
          </MoreReview>
        </ReviewTop>
        <ReviewContainer>
          {reviews[reviews.length - 1] && (
            <Review
              reviewId={reviews[reviews.length - 1].han_id}
              reviewContent={reviews[reviews.length - 1].content}
              author={reviews[reviews.length - 1].han_user.nickname}
              like={reviews[reviews.length - 1].like_num}
              doLIke={reviews[reviews.length - 1].do_like}
              handleDelete={handleDelete}
              render={render}
              setRender={setRender}
            ></Review>
          )}
          {reviews.length === 0 && <span>아직 남겨진 한마디가 없습니다.</span>}
        </ReviewContainer>
        <HR></HR>
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
      </ArticleReviewContainer>
    </>
  );
};

export default ArticleReview;

const ArticleReviewContainer = styled.div`
  width: 390px;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

  font-family: 'Pretendard-Regular';
  font-style: normal;
`;

const HR = styled.div`
  width: 390px;
  height: 8px;
  background: #12111c;
`;

const ReviewTop = styled.div`
  width: 350px;
  margin: 15px 20px 15px 20px;
  display: flex;
  justify-content: space-between;

  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-weight: 600;
  line-height: normal;

  img {
    margin-left: 5px;
  }
`;

const MoreReview = styled.div`
  cursor: pointer;
  display: flex;
`;

const ReviewContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 15px;

  span {
    padding-top: 5px;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    line-height: 133.5%; /* 16.02px */
    letter-spacing: -0.24px;
  }
`;

const InputBoxPosition = styled.div`
  width: 390px;
  padding: 21px 20px;
  box-sizing: border-box;
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
  box-shadow: 0 0 0 1px #fff inset;
  background-color: #161524;
  padding-left: 16px;

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
