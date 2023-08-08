import React, {useState} from 'react';
import styled from 'styled-components';
import more from '../../images/more.svg';
import Review from './Review';
import submiticon from '../../images/submiticon.svg';

const ArticleReview = ({handleBottomSheet}) => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  //한마디 등록
  const handleReviewsSubmit = () => {
    if (review.trim() === '') return null;
    const newReview = {
      id: reviews.length + 1,
      content: review,
    };
    setReviews([...reviews, newReview]);
    setReview('');
    console.log(reviews);
  };

  //한마디 삭제
  const handleDelete = (id) => {
    const updatedReviews = reviews.filter((review) => review.id !== id);
    setReviews(updatedReviews);
  };

  //마지막(최신) 한마디 추출
  const lastReview = reviews.length > 0 ? reviews[reviews.length - 1] : null;

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
          {reviews.length > 0 && (
            <Review
              reviewId={lastReview.id}
              review={lastReview.content}
              handleDelete={handleDelete}
            ></Review>
          )}
        </ReviewContainer>
        <HR></HR>
        <InputBoxPosition>
          <Inputbox
            value={review}
            onChange={(e) => setReview(e.target.value)}
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
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
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
  padding-left: 10px;

  color: rgba(255, 255, 255, 0.6);
  font-family: 'Pretendard-Regular';
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
